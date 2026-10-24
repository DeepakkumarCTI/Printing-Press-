import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { initialProducts } from "../data/products";

const StoreContext = createContext(null);

const STORAGE = {
  products: "printora_products",
  orders: "printora_orders",
  quotes: "printora_quotes",
  admin: "printora_admin_session",
};

// ----------------------------------------
// SAFELY READ DATA FROM LOCAL STORAGE
// ----------------------------------------

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

// ----------------------------------------
// SYNC PRODUCT DATA WITH INITIAL PRODUCTS
// ----------------------------------------

function syncProducts() {
  const storedProducts = readStorage(STORAGE.products, null);

  // First visit: use the latest initial products.
  if (!Array.isArray(storedProducts)) {
    return initialProducts;
  }

  const initialProductMap = new Map(
    initialProducts.map((product) => [product.id, product])
  );

  const storedProductMap = new Map(
    storedProducts.map((product) => [product.id, product])
  );

  // Merge default products with saved products.
  // Always use the latest image path from initialProducts.
  const syncedInitialProducts = initialProducts.map((defaultProduct) => {
    const storedProduct = storedProductMap.get(defaultProduct.id);

    if (!storedProduct) {
      return defaultProduct;
    }

    return {
      ...defaultProduct,
      ...storedProduct,

      // Always use the image defined in products.js.
      image: defaultProduct.image,

      // Keep the original product ID.
      id: defaultProduct.id,
    };
  });

  // Preserve products added through the admin dashboard.
  const additionalProducts = storedProducts.filter(
    (product) => !initialProductMap.has(product.id)
  );

  return [...syncedInitialProducts, ...additionalProducts];
}

// ----------------------------------------
// GENERATE UNIQUE IDS
// ----------------------------------------

function generateId(prefix) {
  return `${prefix}-${Date.now().toString().slice(-7)}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}

// ----------------------------------------
// CREATE ORDER HISTORY ENTRY
// ----------------------------------------

function createHistoryEntry(status, note = "") {
  return {
    status,
    date: new Date().toISOString(),
    note: note || `Order status updated to ${status}.`,
  };
}

// ----------------------------------------
// STORE PROVIDER
// ----------------------------------------

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => syncProducts());

  const [orders, setOrders] = useState(() =>
    readStorage(STORAGE.orders, [])
  );

  const [quotes, setQuotes] = useState(() =>
    readStorage(STORAGE.quotes, [])
  );

  const [admin, setAdmin] = useState(() =>
    readStorage(STORAGE.admin, false)
  );

  // ----------------------------------------
  // SAVE DATA TO LOCAL STORAGE
  // ----------------------------------------

  useEffect(() => {
    localStorage.setItem(
      STORAGE.products,
      JSON.stringify(products)
    );
  }, [products]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.orders,
      JSON.stringify(orders)
    );
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.quotes,
      JSON.stringify(quotes)
    );
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE.admin,
      JSON.stringify(admin)
    );
  }, [admin]);

  // ----------------------------------------
  // CREATE ORDER
  // ----------------------------------------

  const createOrder = (orderData) => {
    const now = new Date().toISOString();

    const order = {
      ...orderData,
      id: generateId("PS"),
      status: "Received",
      createdAt: now,
      updatedAt: now,

      history: [
        ...(Array.isArray(orderData.history)
          ? orderData.history
          : []),

        createHistoryEntry(
          "Received",
          "Your order has been received by Printora Studio."
        ),
      ],
    };

    setOrders((currentOrders) => [
      order,
      ...currentOrders,
    ]);

    return order;
  };

  // ----------------------------------------
  // UPDATE ORDER STATUS
  // ----------------------------------------

  const updateOrderStatus = (id, status, note = "") => {
    if (!id || !status) return;

    setOrders((currentOrders) =>
      currentOrders.map((order) => {
        if (order.id !== id) return order;

        // Avoid duplicate history entries.
        if (order.status === status) return order;

        const now = new Date().toISOString();

        return {
          ...order,
          status,
          updatedAt: now,

          history: [
            ...(Array.isArray(order.history)
              ? order.history
              : []),

            {
              status,
              date: now,
              note:
                note.trim() ||
                `Your order status has been updated to ${status}.`,
            },
          ],
        };
      })
    );
  };

  // ----------------------------------------
  // UPDATE ORDER DETAILS
  // ----------------------------------------

  const updateOrder = (id, changes) => {
    if (!id || !changes) return;

    setOrders((currentOrders) =>
      currentOrders.map((order) => {
        if (order.id !== id) return order;

        const {
          id: ignoredId,
          history: ignoredHistory,
          createdAt: ignoredCreatedAt,
          ...safeChanges
        } = changes;

        return {
          ...order,
          ...safeChanges,
          id: order.id,
          createdAt: order.createdAt,

          history: Array.isArray(order.history)
            ? order.history
            : [],

          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  // ----------------------------------------
  // DELETE ORDER
  // ----------------------------------------

  const deleteOrder = (id) => {
    setOrders((currentOrders) =>
      currentOrders.filter((order) => order.id !== id)
    );
  };

  // ----------------------------------------
  // CREATE QUOTATION REQUEST
  // ----------------------------------------

  const createQuote = (quoteData) => {
    const now = new Date().toISOString();

    const quote = {
      ...quoteData,
      id: generateId("QT"),
      status: "New",
      createdAt: now,
      updatedAt: now,
    };

    setQuotes((currentQuotes) => [
      quote,
      ...currentQuotes,
    ]);

    return quote;
  };

  // ----------------------------------------
  // UPDATE QUOTATION STATUS
  // ----------------------------------------

  const updateQuoteStatus = (id, status) => {
    setQuotes((currentQuotes) =>
      currentQuotes.map((quote) =>
        quote.id === id
          ? {
              ...quote,
              status,
              updatedAt: new Date().toISOString(),
            }
          : quote
      )
    );
  };

  // ----------------------------------------
  // UPDATE QUOTATION DETAILS
  // ----------------------------------------

  const updateQuote = (id, changes) => {
    setQuotes((currentQuotes) =>
      currentQuotes.map((quote) => {
        if (quote.id !== id) return quote;

        const {
          id: ignoredId,
          createdAt: ignoredCreatedAt,
          ...safeChanges
        } = changes;

        return {
          ...quote,
          ...safeChanges,
          id: quote.id,
          createdAt: quote.createdAt,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  // ----------------------------------------
  // UPDATE PRODUCT
  // ----------------------------------------

  const updateProduct = (id, changes) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              ...changes,

              // Keep the original product ID.
              id: product.id,
            }
          : product
      )
    );
  };

  // ----------------------------------------
  // ADD PRODUCT
  // ----------------------------------------

  const addProduct = (productData) => {
    const product = {
      ...productData,
      id: generateId("PR"),
      active: productData.active ?? true,
      createdAt: new Date().toISOString(),
    };

    setProducts((currentProducts) => [
      product,
      ...currentProducts,
    ]);

    return product;
  };

  // ----------------------------------------
  // DELETE PRODUCT
  // ----------------------------------------

  const deleteProduct = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== id
      )
    );
  };

  // ----------------------------------------
  // CONTEXT VALUE
  // ----------------------------------------

  const value = useMemo(
    () => ({
      products,
      orders,
      quotes,
      admin,
      setAdmin,

      // Orders
      createOrder,
      updateOrderStatus,
      updateOrder,
      deleteOrder,

      // Quotations
      createQuote,
      updateQuoteStatus,
      updateQuote,

      // Products
      updateProduct,
      addProduct,
      deleteProduct,
    }),
    [products, orders, quotes, admin]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

// ----------------------------------------
// CUSTOM STORE HOOK
// ----------------------------------------

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}
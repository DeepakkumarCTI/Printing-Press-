import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import FormField, { inputClass } from "../components/FormField";
import logo from "../assets/logo.png";

const orderStatuses = [
  "Received",
  "In Progress",
  "Ready for Dispatch",
  "Dispatched",
  "Delivered",
  "Cancelled",
];

const quoteStatuses = ["New", "Contacted", "Quoted"];

const tabs = [
  { id: "overview", label: "Overview", number: "01" },
  { id: "orders", label: "Orders", number: "02" },
  { id: "quotes", label: "Quotes", number: "03" },
  { id: "products", label: "Products", number: "04" },
];

const initialProduct = {
  name: "",
  category: "Business Printing",
  description: "",
  price: "",
  unit: "100 pieces",
  image: "",
  sizes: "Standard, Custom size",
  materials: "Matte, Gloss",
};

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div className="min-w-0">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#967019] sm:text-xs sm:tracking-[0.2em]">
          {eyebrow}
        </p>

        <h2 className="mt-1.5 text-xl font-black tracking-tight text-[#38343A] sm:mt-2 sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-xs leading-5 text-[#77716B] sm:text-sm sm:leading-6">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

function Panel({ children, className = "" }) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-[#E5DED3] bg-white p-3 shadow-sm sm:rounded-2xl sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function StatCard({ label, value, note, number, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex min-h-[145px] w-full min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-[#E5DED3] bg-white p-3 text-left transition duration-200 hover:-translate-y-1 hover:border-[#D9AD32] hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E0B12E]/20 sm:min-h-[190px] sm:rounded-2xl sm:p-6"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[8px] font-extrabold uppercase tracking-[0.1em] text-[#8A8379] sm:text-[10px] sm:tracking-[0.16em]">
          {number}
        </span>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F7F1E4] text-sm font-bold text-[#967019] transition group-hover:bg-[#E0B12E] group-hover:text-[#38343A] sm:h-10 sm:w-10 sm:rounded-xl sm:text-lg">
          ↗
        </span>
      </div>

      <div className="mt-3 min-w-0 sm:mt-5">
        <p className="text-xs font-semibold text-[#77716B] sm:text-sm">
          {label}
        </p>

        <p className="mt-1 break-words text-2xl font-black tracking-tight text-[#38343A] sm:text-4xl">
          {value}
        </p>

        <p className="mt-1 text-[10px] leading-4 text-[#8A8379] sm:mt-2 sm:text-xs sm:leading-5">
          {note}
        </p>
      </div>

      <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#E0B12E] transition-all duration-300 group-hover:w-full" />
    </button>
  );
}

function Empty({ text, action }) {
  return (
    <div className="mt-4 rounded-xl border border-dashed border-[#DED5C4] bg-[#FCFAF6] px-3 py-7 text-center sm:mt-5 sm:px-5 sm:py-10">
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4EBD7] text-lg font-bold text-[#967019] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-xl">
        —
      </div>

      <p className="mt-3 text-xs font-semibold leading-5 text-[#77716B] sm:text-sm">
        {text}
      </p>

      {action}
    </div>
  );
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#8A8379]">
        ⌕
      </span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#E5DED3] bg-[#FCFAF6] py-2.5 pl-9 pr-3 text-xs text-[#38343A] outline-none transition placeholder:text-[#A49B8E] focus:border-[#D9AD32] focus:bg-white focus:ring-4 focus:ring-[#D9AD32]/10 sm:rounded-xl sm:py-3 sm:pl-10 sm:pr-4 sm:text-sm"
      />
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="min-w-0 rounded-lg border border-[#EEE8DE] bg-white p-2 sm:rounded-xl sm:p-3">
      <p className="text-[9px] font-semibold text-[#8A8379] sm:text-[10px]">
        {label}
      </p>

      <p className="mt-1 break-words text-[10px] font-bold text-[#38343A] sm:text-xs">
        {value}
      </p>
    </div>
  );
}

function formatPrice(price) {
  return `₹${Number(price || 0).toLocaleString("en-IN")}`;
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDesignUrl(order) {
  const candidates = [
    order.designUrl,
    order.designImage,
    order.designDataUrl,
    order.designPreview,
    order.designFileUrl,
    order.uploadedDesignUrl,
  ];

  return (
    candidates.find(
      (value) => typeof value === "string" && value.trim().length > 0
    ) || ""
  );
}

export default function Admin() {
  const {
    products,
    orders,
    quotes,
    admin,
    setAdmin,
    updateOrderStatus,
    updateQuoteStatus,
    updateProduct,
    addProduct,
  } = useStore();

  const navigate = useNavigate();

  const [tab, setTab] = useState("overview");
  const [orderSearch, setOrderSearch] = useState("");
  const [quoteSearch, setQuoteSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState(initialProduct);
  const [designPreview, setDesignPreview] = useState(null);

  useEffect(() => {
    if (!admin) {
      navigate("/login", { replace: true });
    }
  }, [admin, navigate]);

  useEffect(() => {
    if (!designPreview) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDesignPreview(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [designPreview]);

  const filteredOrders = useMemo(() => {
    const search = orderSearch.trim().toLowerCase();

    return orders.filter((order) =>
      `${order.id || ""} ${order.customerName || ""} ${
        order.productName || ""
      } ${order.email || ""}`
        .toLowerCase()
        .includes(search)
    );
  }, [orders, orderSearch]);

  const filteredQuotes = useMemo(() => {
    const search = quoteSearch.trim().toLowerCase();

    return quotes.filter((quote) =>
      `${quote.id || ""} ${quote.name || ""} ${quote.product || ""} ${
        quote.email || ""
      }`
        .toLowerCase()
        .includes(search)
    );
  }, [quotes, quoteSearch]);

  const activeOrders = orders.filter(
    (order) => !["Delivered", "Cancelled"].includes(order.status)
  );

  const activeProducts = products.filter((product) => product.active);

  const goToTab = (nextTab) => {
    setTab(nextTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = () => {
    setAdmin(false);
    navigate("/login", { replace: true });
  };

  const saveProduct = (event) => {
    event.preventDefault();

    if (!newProduct.name.trim() || !newProduct.price) return;

    addProduct({
      ...newProduct,
      name: newProduct.name.trim(),
      price: Number(newProduct.price),
      image:
        newProduct.image.trim() ||
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
      sizes: newProduct.sizes
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean),
      materials: newProduct.materials
        .split(",")
        .map((material) => material.trim())
        .filter(Boolean),
      tag: "New arrival",
    });

    setNewProduct(initialProduct);
    setShowAdd(false);
    goToTab("products");
  };

  const openDesignPreview = (order) => {
    setDesignPreview({
      name: order.designName || "Uploaded custom design",
      url: getDesignUrl(order),
      orderId: order.id,
      customerName: order.customerName || "Customer",
    });
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#F5F2EC] text-[#38343A]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#E5DED3] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[64px] w-full max-w-[1800px] items-center justify-between gap-2 px-2.5 sm:min-h-[76px] sm:gap-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => goToTab("overview")}
            className="flex min-w-0 items-center gap-2 text-left sm:gap-3"
          >
            <img
              src={logo}
              alt="Printora Studio logo"
              className="h-9 w-9 shrink-0 rounded-lg object-contain sm:h-12 sm:w-12 sm:rounded-xl"
            />

            <span className="min-w-0">
              <span className="block truncate text-sm font-black tracking-tight sm:text-xl">
                Printora Studio
              </span>

              <span className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8379] sm:block">
                Print · Create · Customize
              </span>
            </span>
          </button>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <div className="hidden items-center gap-3 rounded-xl border border-[#E5DED3] bg-[#FCFAF6] px-3 py-2 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0E5CA] text-xs font-black text-[#725514]">
                A
              </span>

              <span>
                <span className="block text-xs font-bold">Administrator</span>
                <span className="mt-0.5 block text-[10px] text-[#8A8379]">
                  admin@gmail.com
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="hidden rounded-xl border border-[#E5DED3] px-3 py-2.5 text-xs font-bold transition hover:border-[#D9AD32] hover:bg-[#FCFAF6] sm:inline-flex"
            >
              View website ↗
            </button>

            <button
              type="button"
              onClick={logout}
              className="rounded-lg bg-[#38343A] px-2.5 py-2 text-[10px] font-bold text-white transition hover:bg-[#514B53] sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1800px] min-w-0 px-2 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl bg-[#38343A] p-4 text-white shadow-sm sm:rounded-3xl sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border-[38px] border-white/[0.04]" />

          <div className="pointer-events-none absolute -bottom-28 right-28 h-64 w-64 rounded-full border-[30px] border-[#E0B12E]/10" />

          <div className="relative flex min-w-0 flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="min-w-0 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-2.5 py-1.5 sm:px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E0B12E]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#F0D88C] sm:text-[10px] sm:tracking-[0.18em]">
                  Admin workspace
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Good work starts here.
              </h1>

              <p className="mt-3 max-w-xl text-xs leading-5 text-white/65 sm:text-base sm:leading-6">
                Manage print orders, customer enquiries, and your product
                catalog from one place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              <button
                type="button"
                onClick={() => goToTab("orders")}
                className="rounded-lg bg-[#E0B12E] px-2 py-3 text-xs font-extrabold text-[#38343A] transition hover:bg-[#F0C64E] sm:rounded-xl sm:px-4 sm:text-sm"
              >
                Manage orders ↗
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAdd(true);
                  goToTab("products");
                }}
                className="rounded-lg border border-white/20 bg-white/[0.07] px-2 py-3 text-xs font-bold text-white transition hover:bg-white/[0.13] sm:rounded-xl sm:px-4 sm:text-sm"
              >
                + Add product
              </button>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <nav
          aria-label="Admin sections"
          className="mt-4 grid grid-cols-4 gap-1 rounded-xl border border-[#E5DED3] bg-white p-1.5 shadow-sm sm:mt-5 sm:gap-2 sm:rounded-2xl sm:p-2"
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToTab(item.id)}
              aria-current={tab === item.id ? "page" : undefined}
              className={`flex min-w-0 items-center justify-center gap-1 rounded-lg px-1 py-3 text-[9px] font-bold transition sm:gap-2 sm:rounded-xl sm:px-3 sm:text-xs lg:px-5 lg:text-sm ${
                tab === item.id
                  ? "bg-[#38343A] text-white shadow-sm"
                  : "text-[#77716B] hover:bg-[#F5F2EC] hover:text-[#38343A]"
              }`}
            >
              <span
                className={`shrink-0 text-[8px] sm:text-[10px] ${
                  tab === item.id ? "text-[#E0B12E]" : "text-[#A49B8E]"
                }`}
              >
                {item.number}
              </span>

              <span className="min-w-0 truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Overview */}
        {tab === "overview" && (
          <div className="mt-5 space-y-5 sm:mt-7 sm:space-y-7">
            <SectionHeading
              eyebrow="At a glance"
              title="Your business overview"
              description="Select any card to open its management section."
            />

            <div className="grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-4">
              <StatCard
                number="01 / ORDERS"
                label="Total orders"
                value={orders.length}
                note="View and manage every customer order"
                onClick={() => goToTab("orders")}
              />

              <StatCard
                number="02 / ACTIVE"
                label="Active orders"
                value={activeOrders.length}
                note="Track orders awaiting completion"
                onClick={() => goToTab("orders")}
              />

              <StatCard
                number="03 / ENQUIRIES"
                label="Quote requests"
                value={quotes.length}
                note="Review customer pricing enquiries"
                onClick={() => goToTab("quotes")}
              />

              <StatCard
                number="04 / CATALOG"
                label="Active products"
                value={activeProducts.length}
                note="Manage products shown to customers"
                onClick={() => goToTab("products")}
              />
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-5 xl:grid-cols-[1.4fr_1fr]">
              {/* Recent orders */}
              <Panel>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#967019] sm:text-[10px] sm:tracking-[0.18em]">
                      Order activity
                    </p>

                    <h3 className="mt-1 text-base font-black sm:text-lg">
                      Recent orders
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToTab("orders")}
                    className="shrink-0 rounded-lg px-2 py-2 text-[10px] font-extrabold text-[#967019] transition hover:bg-[#F7F1E4] sm:px-3 sm:text-xs"
                  >
                    View all →
                  </button>
                </div>

                {orders.length > 0 ? (
                  <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
                    {[...orders]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt || b.date || 0).getTime() -
                          new Date(a.createdAt || a.date || 0).getTime()
                      )
                      .slice(0, 5)
                      .map((order) => (
                        <div
                          key={order.id}
                          className="flex min-w-0 flex-col justify-between gap-2 rounded-lg border border-[#EEE8DE] bg-[#FCFAF6] p-3 sm:flex-row sm:items-center sm:rounded-xl sm:p-4"
                        >
                          <div className="min-w-0">
                            <p className="break-words text-xs font-extrabold sm:text-sm">
                              {order.productName || "Printing product"}
                            </p>

                            <p className="mt-1 break-words text-[10px] text-[#77716B] sm:text-xs">
                              {order.id} · {order.customerName || "Customer"}
                            </p>

                            <p className="mt-1 text-[10px] text-[#8A8379] sm:text-[11px]">
                              {formatDate(order.createdAt || order.date)}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
                            <StatusBadge status={order.status} />

                            <span className="text-xs font-black sm:text-sm">
                              {formatPrice(order.estimatedTotal)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <Empty text="New customer orders will appear here." />
                )}
              </Panel>

              {/* Recent quotes */}
              <Panel>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#967019] sm:text-[10px] sm:tracking-[0.18em]">
                      Customer enquiries
                    </p>

                    <h3 className="mt-1 text-base font-black sm:text-lg">
                      Latest quote requests
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToTab("quotes")}
                    className="shrink-0 rounded-lg px-2 py-2 text-[10px] font-extrabold text-[#967019] transition hover:bg-[#F7F1E4] sm:px-3 sm:text-xs"
                  >
                    View all →
                  </button>
                </div>

                {quotes.length > 0 ? (
                  <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
                    {[...quotes]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt || b.date || 0).getTime() -
                          new Date(a.createdAt || a.date || 0).getTime()
                      )
                      .slice(0, 5)
                      .map((quote) => (
                        <div
                          key={quote.id}
                          className="rounded-lg border border-[#EEE8DE] bg-[#FCFAF6] p-3 sm:rounded-xl sm:p-4"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <p className="break-words text-xs font-extrabold sm:text-sm">
                              {quote.name || "Customer"}
                            </p>

                            <StatusBadge status={quote.status} />
                          </div>

                          <p className="mt-2 break-words text-xs text-[#77716B] sm:text-sm">
                            {quote.product || "Custom project"}
                          </p>

                          <p className="mt-1 text-[10px] text-[#8A8379] sm:text-[11px]">
                            {quote.id} ·{" "}
                            {formatDate(quote.createdAt || quote.date)}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <Empty text="New quote enquiries will appear here." />
                )}
              </Panel>
            </div>

            {/* Quick actions */}
            <Panel>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#967019] sm:text-[10px] sm:tracking-[0.18em]">
                Quick actions
              </p>

              <h3 className="mt-1 text-base font-black sm:text-lg">
                What would you like to do?
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                {[
                  {
                    title: "Review orders",
                    text: "Check customer details and update progress.",
                    tab: "orders",
                  },
                  {
                    title: "Handle enquiries",
                    text: "Review quote requirements and their status.",
                    tab: "quotes",
                  },
                  {
                    title: "Update catalog",
                    text: "Add products or control catalog visibility.",
                    tab: "products",
                  },
                ].map((action) => (
                  <button
                    key={action.tab}
                    type="button"
                    onClick={() => goToTab(action.tab)}
                    className="group rounded-lg border border-[#E5DED3] p-3 text-left transition hover:border-[#D9AD32] hover:bg-[#FCFAF6] sm:rounded-xl sm:p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-extrabold sm:text-sm">
                        {action.title}
                      </span>

                      <span className="text-base text-[#967019] transition group-hover:translate-x-1 sm:text-lg">
                        →
                      </span>
                    </div>

                    <p className="mt-2 text-[10px] leading-4 text-[#77716B] sm:text-xs sm:leading-5">
                      {action.text}
                    </p>
                  </button>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* Orders */}
        {tab === "orders" && (
          <div className="mt-5 sm:mt-7">
            <Panel>
              <SectionHeading
                eyebrow="Order management"
                title="Customer orders"
                description="Review order information, preview customer artwork, and update the status customers see on the tracking page."
              />

              <div className="mt-4 flex flex-col gap-3 rounded-lg bg-[#FCFAF6] p-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:rounded-xl">
                <p className="text-[10px] font-semibold text-[#77716B] sm:text-xs">
                  {filteredOrders.length}{" "}
                  {filteredOrders.length === 1 ? "order" : "orders"} found
                </p>

                <SearchInput
                  value={orderSearch}
                  onChange={setOrderSearch}
                  placeholder="Search ID, customer, email..."
                />
              </div>

              {filteredOrders.length > 0 ? (
                <div className="mt-4 w-full max-w-full overflow-x-auto rounded-lg border border-[#E5DED3] sm:mt-5 sm:rounded-xl">
                  <table className="w-full min-w-[850px] text-left text-sm">
                    <thead className="bg-[#F8F5EF]">
                      <tr className="border-b border-[#E5DED3] text-[10px] uppercase tracking-[0.12em] text-[#77716B]">
                        <th className="px-4 py-4 font-extrabold">
                          Order / customer
                        </th>
                        <th className="px-4 py-4 font-extrabold">Product</th>
                        <th className="px-4 py-4 font-extrabold">Total</th>
                        <th className="px-4 py-4 font-extrabold">Date</th>
                        <th className="px-4 py-4 font-extrabold">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredOrders.map((order) => {
                        const designUrl = getDesignUrl(order);

                        const hasDesign =
                          Boolean(designUrl) || Boolean(order.designName);

                        return (
                          <tr
                            key={order.id}
                            className="border-b border-[#EEE8DE] align-top transition last:border-0 hover:bg-[#FCFAF6]"
                          >
                            <td className="px-4 py-4">
                              <p className="break-all font-extrabold">
                                {order.id}
                              </p>

                              <p className="mt-1 font-semibold">
                                {order.customerName || "Not provided"}
                              </p>

                              <p className="mt-1 text-xs text-[#77716B]">
                                {order.email || "No email"}
                              </p>

                              <p className="mt-1 text-xs text-[#77716B]">
                                {order.phone || "No phone"}
                              </p>
                            </td>

                            <td className="px-4 py-4">
                              <p className="font-bold">
                                {order.productName || "Printing product"}
                              </p>

                              <p className="mt-1 text-xs text-[#77716B]">
                                Quantity: {order.quantity ?? "—"}
                              </p>

                              <p className="mt-1 text-xs text-[#77716B]">
                                Size: {order.size || "Not specified"}
                              </p>

                              <p className="mt-1 text-xs text-[#77716B]">
                                Material: {order.material || "Not specified"}
                              </p>

                              {hasDesign && (
                                <div className="mt-3">
                                  <p className="mb-1 text-[10px] font-extrabold uppercase tracking-wider text-[#8A8379]">
                                    Customer design
                                  </p>

                                  <button
                                    type="button"
                                    onClick={() => openDesignPreview(order)}
                                    className="inline-flex max-w-full items-center gap-2 rounded-lg border border-[#E5DED3] bg-[#FCFAF6] px-3 py-2 text-left text-xs font-bold text-[#967019] transition hover:border-[#D9AD32] hover:bg-[#F7F1E4]"
                                  >
                                    <span className="min-w-0 break-all">
                                      {order.designName ||
                                        "View uploaded design"}
                                    </span>

                                    <span className="shrink-0">↗</span>
                                  </button>
                                </div>
                              )}
                            </td>

                            <td className="whitespace-nowrap px-4 py-4 font-black">
                              {formatPrice(order.estimatedTotal)}
                            </td>

                            <td className="whitespace-nowrap px-4 py-4 text-xs text-[#77716B]">
                              {formatDate(
                                order.createdAt || order.orderDate || order.date
                              )}
                            </td>

                            <td className="px-4 py-4">
                              <StatusBadge status={order.status} />

                              <select
                                aria-label={`Update status for ${order.id}`}
                                value={order.status || "Received"}
                                onChange={(e) =>
                                  updateOrderStatus(order.id, e.target.value)
                                }
                                className="mt-3 w-full min-w-[145px] rounded-lg border border-[#E5DED3] bg-white px-2.5 py-2 text-xs font-bold outline-none focus:border-[#D9AD32] focus:ring-2 focus:ring-[#D9AD32]/10"
                              >
                                {orderStatuses.map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Empty text="No matching orders found. Try another search." />
              )}
            </Panel>
          </div>
        )}

        {/* Quote requests */}
        {tab === "quotes" && (
          <div className="mt-5 sm:mt-7">
            <Panel>
              <SectionHeading
                eyebrow="Customer enquiries"
                title="Quote requests"
                description="Review printing requirements and keep enquiry statuses up to date."
              />

              <div className="mt-4 flex flex-col gap-3 rounded-lg bg-[#FCFAF6] p-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:rounded-xl">
                <p className="text-[10px] font-semibold text-[#77716B] sm:text-xs">
                  {filteredQuotes.length}{" "}
                  {filteredQuotes.length === 1 ? "request" : "requests"} found
                </p>

                <SearchInput
                  value={quoteSearch}
                  onChange={setQuoteSearch}
                  placeholder="Search name, product, email..."
                />
              </div>

              {filteredQuotes.length > 0 ? (
                <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
                  {filteredQuotes.map((quote) => (
                    <article
                      key={quote.id}
                      className="rounded-xl border border-[#E5DED3] p-3 transition hover:border-[#D9AD32] sm:rounded-2xl sm:p-5"
                    >
                      <div className="flex min-w-0 flex-col justify-between gap-4 lg:flex-row lg:items-start">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-black sm:text-base">
                              {quote.name || "Customer"}
                            </h3>

                            <span className="break-all rounded-md bg-[#F5F2EC] px-2 py-1 text-[9px] font-bold text-[#77716B] sm:text-[10px]">
                              {quote.id}
                            </span>

                            <StatusBadge status={quote.status} />
                          </div>

                          <p className="mt-2 break-words text-xs text-[#77716B] sm:text-sm">
                            {quote.email || "No email"}
                            {quote.phone ? ` · ${quote.phone}` : ""}
                          </p>

                          <div className="mt-3 rounded-lg bg-[#FCFAF6] p-3 sm:mt-4 sm:rounded-xl sm:p-4">
                            <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#967019] sm:text-[10px]">
                              Requested project
                            </p>

                            <p className="mt-1 break-words text-xs font-extrabold sm:text-sm">
                              {quote.product || "Custom project"}
                              {quote.quantity ? ` · ${quote.quantity}` : ""}
                            </p>

                            <p className="mt-2 whitespace-pre-wrap break-words text-xs leading-5 text-[#77716B] sm:text-sm sm:leading-6">
                              {quote.details ||
                                "No additional details provided."}
                            </p>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3">
                            <InfoItem
                              label="Size"
                              value={quote.size || "Not specified"}
                            />

                            <InfoItem
                              label="Material"
                              value={quote.material || "Not specified"}
                            />

                            <InfoItem
                              label="Required by"
                              value={quote.deadline || "Flexible"}
                            />
                          </div>

                          <p className="mt-3 text-[10px] text-[#8A8379] sm:mt-4 sm:text-xs">
                            Submitted:{" "}
                            {formatDate(quote.createdAt || quote.date)}
                          </p>
                        </div>

                        <div className="w-full shrink-0 rounded-lg bg-[#FCFAF6] p-3 sm:rounded-xl lg:w-56">
                          <label className="text-xs font-bold text-[#77716B]">
                            Update enquiry status

                            <select
                              value={quote.status || "New"}
                              onChange={(e) =>
                                updateQuoteStatus(quote.id, e.target.value)
                              }
                              className={`${inputClass} mt-2`}
                            >
                              {quoteStatuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <Empty text="No quote requests found. Try another search." />
              )}
            </Panel>
          </div>
        )}

        {/* Products */}
        {tab === "products" && (
          <div className="mt-5 space-y-4 sm:mt-7 sm:space-y-5">
            <Panel>
              <SectionHeading
                eyebrow="Catalog management"
                title="Product catalog"
                description="Add printing products and control which products customers can see on your website."
                action={
                  <Button
                    type="button"
                    onClick={() => setShowAdd((current) => !current)}
                  >
                    {showAdd ? "Close form" : "+ Add product"}
                  </Button>
                }
              />

              {showAdd && (
                <form
                  onSubmit={saveProduct}
                  className="mt-5 rounded-xl border border-[#E5DED3] bg-[#FCFAF6] p-3 sm:mt-6 sm:rounded-2xl sm:p-6"
                >
                  <div className="mb-4 sm:mb-5">
                    <h3 className="text-base font-black sm:text-lg">
                      Add a new product
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#77716B]">
                      Complete the details below to add an item to your
                      catalog.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    <FormField label="Product name" required>
                      <input
                        required
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            name: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="e.g. Business cards"
                      />
                    </FormField>

                    <FormField label="Category">
                      <select
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className={inputClass}
                      >
                        {[
                          "Business Printing",
                          "Large Format",
                          "Apparel",
                          "Custom Gifts",
                          "Packaging",
                        ].map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="Starting price (₹)" required>
                      <input
                        required
                        type="number"
                        min="1"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="500"
                      />
                    </FormField>

                    <FormField label="Price unit">
                      <input
                        value={newProduct.unit}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            unit: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="100 pieces"
                      />
                    </FormField>

                    <FormField label="Image URL">
                      <input
                        type="url"
                        value={newProduct.image}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            image: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="https://..."
                      />
                    </FormField>

                    <FormField label="Description">
                      <input
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="Short product description"
                      />
                    </FormField>

                    <FormField label="Sizes (comma-separated)">
                      <input
                        value={newProduct.sizes}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            sizes: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="Standard, Custom size"
                      />
                    </FormField>

                    <FormField label="Materials (comma-separated)">
                      <input
                        value={newProduct.materials}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            materials: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="Matte, Gloss"
                      />
                    </FormField>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                    <Button type="submit">Save product</Button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAdd(false);
                        setNewProduct(initialProduct);
                      }}
                      className="rounded-lg border border-[#E5DED3] bg-white px-4 py-2.5 text-xs font-bold transition hover:bg-[#F5F2EC] sm:rounded-xl sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </Panel>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-black sm:text-lg">
                  All products
                </h3>

                <p className="mt-1 text-[10px] text-[#77716B] sm:text-xs">
                  {products.length} products in your catalog
                </p>
              </div>

              <span className="rounded-lg border border-[#E5DED3] bg-white px-2.5 py-2 text-[10px] font-bold text-[#77716B] sm:px-3 sm:text-xs">
                {activeProducts.length} visible
              </span>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E5DED3] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#D9AD32] hover:shadow-lg sm:rounded-2xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EDE7] sm:aspect-[16/10]">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <span
                        className={`absolute left-1.5 top-1.5 rounded-md px-1.5 py-1 text-[8px] font-extrabold sm:left-3 sm:top-3 sm:rounded-lg sm:px-2.5 sm:py-1.5 sm:text-[10px] ${
                          product.active
                            ? "bg-white text-[#725514]"
                            : "bg-[#38343A] text-white"
                        }`}
                      >
                        {product.active ? "Published" : "Hidden"}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-2.5 sm:p-4">
                      <p className="break-words text-[8px] font-bold uppercase tracking-[0.08em] text-[#967019] sm:text-[10px] sm:tracking-[0.13em]">
                        {product.category}
                      </p>

                      <h4 className="mt-1.5 break-words text-xs font-black sm:mt-2 sm:text-base">
                        {product.name}
                      </h4>

                      {product.description && (
                        <p className="mt-2 hidden line-clamp-2 text-xs leading-5 text-[#77716B] sm:block">
                          {product.description}
                        </p>
                      )}

                      <div className="mt-auto border-t border-[#EEE8DE] pt-3 mt-3 sm:mt-4 sm:pt-4">
                        <p className="text-[9px] font-semibold text-[#8A8379] sm:text-[10px]">
                          Starting price
                        </p>

                        <p className="mt-1 break-words text-base font-black sm:text-xl">
                          {formatPrice(product.price)}

                          <span className="ml-1 text-[9px] font-medium text-[#77716B] sm:text-xs">
                            / {product.unit || "unit"}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch justify-between gap-2 border-t border-[#E5DED3] bg-[#FCFAF6] p-2 sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3">
                      <span className="break-all text-[9px] font-semibold text-[#77716B] sm:text-[10px]">
                        {product.id}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateProduct(product.id, {
                            active: !product.active,
                          })
                        }
                        className={`w-full rounded-lg px-2 py-2 text-[10px] font-extrabold transition sm:w-auto sm:shrink-0 sm:px-3 sm:text-xs ${
                          product.active
                            ? "border border-[#E5DED3] bg-white text-[#38343A] hover:border-[#D9AD32]"
                            : "bg-[#38343A] text-white hover:bg-[#514B53]"
                        }`}
                      >
                        {product.active ? "Hide product" : "Publish product"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <Panel>
                <Empty
                  text="Your catalog is empty. Add your first product to get started."
                  action={
                    <button
                      type="button"
                      onClick={() => setShowAdd(true)}
                      className="mt-4 rounded-lg bg-[#38343A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#514B53]"
                    >
                      + Add your first product
                    </button>
                  }
                />
              </Panel>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-7 flex flex-col justify-between gap-2 border-t border-[#E5DED3] py-4 text-center sm:mt-9 sm:flex-row sm:py-5 sm:text-left">
          <p className="text-[10px] font-semibold text-[#77716B] sm:text-xs">
            Printora Studio{" "}
            <span className="mx-1 text-[#D9AD32]">/</span> Admin workspace
          </p>

          <p className="text-[9px] text-[#8A8379] sm:text-[10px]">
            Demo dashboard · Data is stored in this browser&apos;s Local Storage.
          </p>
        </footer>
      </main>

      {/* Customer design preview modal */}
      {designPreview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#211E23]/75 p-2 backdrop-blur-sm sm:p-6"
          onClick={() => setDesignPreview(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Uploaded custom design preview"
            className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-[#E5DED3] bg-white shadow-2xl sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-3 border-b border-[#E5DED3] px-3 py-3 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#967019] sm:text-[10px] sm:tracking-[0.18em]">
                  Customer upload
                </p>

                <h2 className="mt-1 text-sm font-black text-[#38343A] sm:text-lg">
                  Custom design preview
                </h2>

                <p className="mt-1 break-all text-[10px] text-[#77716B] sm:text-xs">
                  {designPreview.name}
                </p>

                <p className="mt-1 text-[9px] text-[#8A8379] sm:text-[11px]">
                  Order: {designPreview.orderId} · {designPreview.customerName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDesignPreview(null)}
                aria-label="Close design preview"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E5DED3] text-xl text-[#38343A] transition hover:border-[#D9AD32] hover:bg-[#F7F1E4] sm:h-10 sm:w-10 sm:rounded-xl"
              >
                ×
              </button>
            </header>

            <div className="flex min-h-[220px] flex-1 items-center justify-center overflow-auto bg-[#F5F2EC] p-3 sm:min-h-[400px] sm:p-8">
              {designPreview.url ? (
                <img
                  src={designPreview.url}
                  alt={designPreview.name}
                  className="max-h-[62vh] max-w-full rounded-lg object-contain shadow-sm"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="max-w-md rounded-xl border border-dashed border-[#D9AD32] bg-white p-4 text-center sm:rounded-2xl sm:p-6">
                  <p className="text-sm font-extrabold text-[#38343A]">
                    Image preview unavailable
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#77716B] sm:text-sm sm:leading-6">
                    The order has a design filename, but no accessible image
                    URL was found. Save the uploaded image URL or data URL with
                    the order when the customer submits it.
                  </p>
                </div>
              )}
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E5DED3] px-3 py-3 sm:px-6 sm:py-4">
              <p className="hidden text-xs text-[#77716B] sm:block">
                Review the customer&apos;s artwork before processing the order.
              </p>

              <div className="ml-auto flex flex-wrap gap-2">
                {designPreview.url && (
                  <a
                    href={designPreview.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-[#E5DED3] px-3 py-2 text-[10px] font-bold text-[#38343A] transition hover:bg-[#FCFAF6] sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs"
                  >
                    Open original ↗
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setDesignPreview(null)}
                  className="rounded-lg bg-[#38343A] px-3 py-2 text-[10px] font-bold text-white transition hover:bg-[#514B53] sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs"
                >
                  Close preview
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
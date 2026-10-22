
import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";
import StatusBadge from "../components/StatusBadge";
import FormField, { inputClass } from "../components/FormField";

export default function TrackOrder() {
  const { orders } = useStore();

  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!modalOpen && !selectedOrder) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        if (selectedOrder) {
          setSelectedOrder(null);
        } else {
          setModalOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [modalOpen, selectedOrder]);

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrderDate = (order) =>
    order.createdAt || order.orderDate || order.date;

  const getHistory = (order) => {
    const history = Array.isArray(order.history)
      ? [...order.history]
      : [];

    const hasCurrentStatus = history.some(
      (item) =>
        String(item.status || "").toLowerCase() ===
        String(order.status || "").toLowerCase()
    );

    if (order.status && !hasCurrentStatus) {
      history.push({
        status: order.status,
        date: order.updatedAt || getOrderDate(order),
        note: "Current order status",
      });
    }

    return history.sort(
      (a, b) =>
        new Date(b.date || 0).getTime() -
        new Date(a.date || 0).getTime()
    );
  };

  const submit = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    const foundOrders = orders
      .filter(
        (order) =>
          String(order.email || "").trim().toLowerCase() ===
          normalizedEmail
      )
      .sort(
        (a, b) =>
          new Date(getOrderDate(b) || 0).getTime() -
          new Date(getOrderDate(a) || 0).getTime()
      );

    setResults(foundOrders);
    setSelectedOrder(null);
    setSearched(true);
    setModalOpen(foundOrders.length > 0);
  };

  const resetSearch = () => {
    setEmail("");
    setResults([]);
    setSelectedOrder(null);
    setModalOpen(false);
    setSearched(false);
  };

  const closeOrdersModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  return (
    <main className="relative min-h-[75vh] overflow-hidden bg-[#F5F2EC] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12 xl:px-14">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-[#E6C66C]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-96 h-72 w-72 rounded-full bg-white/80 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        {/* Page heading */}
        <header className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D7B6] bg-white/80 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#D9AD32]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#967019] sm:text-xs">
              Printora Studio · Order updates
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#38343A] sm:text-5xl lg:text-6xl">
            Your order,
            <span className="block text-[#B58A20]">
              every step of the way.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#77716B] sm:text-base">
            Stay up to date with your printing order. Enter your email
            to view order progress, pricing, and delivery information.
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#77716B]">
            <span className="h-px w-8 bg-[#D9AD32]" />
            Simple. Transparent. Reliable.
            <span className="h-px w-8 bg-[#D9AD32]" />
          </div>
        </header>

        {/* Search card */}
        <section className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-3xl border border-[#E7DFD2] bg-white shadow-[0_18px_55px_rgba(56,52,58,0.07)] sm:mt-10">
          <div className="h-1.5 bg-gradient-to-r from-[#B58A20] via-[#E6C66C] to-[#B58A20]" />

          <div className="p-5 sm:p-8 lg:p-9">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F8F0D9] text-[#967019]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </div>

              <div className="min-w-0 pt-0.5">
                <h2 className="text-xl font-extrabold tracking-tight text-[#38343A] sm:text-2xl">
                  Find your orders
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-[#77716B]">
                  Use the email address you provided when placing your order.
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="mt-7">
              <FormField label="Email address" required>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </FormField>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#38343A] px-6 py-3 text-sm font-bold text-white shadow-sm transition duration-200 hover:bg-[#514B53] hover:shadow-md active:scale-[0.99] sm:flex-1"
                >
                  Track my orders

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>

                {searched && (
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="min-h-12 rounded-xl border border-[#E4DCCF] bg-white px-6 py-3 text-sm font-bold text-[#514B53] transition hover:border-[#D9AD32] hover:bg-[#FBF8F1]"
                  >
                    Clear search
                  </button>
                )}
              </div>

              <p className="mt-4 text-center text-[11px] leading-5 text-[#91897E]">
                Enter the same email address used during checkout.
              </p>
            </form>
          </div>
        </section>

        {/* Order search result */}
        {searched && results.length > 0 && !modalOpen && (
          <section className="mx-auto mt-6 w-full max-w-4xl overflow-hidden rounded-2xl border border-[#E5D8B8] bg-white shadow-sm">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7F0DB] text-[#967019]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <h2 className="font-extrabold text-[#38343A]">
                    Your orders are ready
                  </h2>

                  <p className="mt-1 break-all text-xs text-[#77716B]">
                    {email.trim()}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#38343A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#514B53]"
              >
                View orders
                <span className="rounded-md bg-white/15 px-2 py-0.5 text-xs">
                  {results.length}
                </span>
              </button>
            </div>
          </section>
        )}

        {/* No orders found */}
        {searched && results.length === 0 && (
          <section
            role="alert"
            className="mx-auto mt-6 w-full max-w-4xl rounded-2xl border border-[#E7DFD2] bg-white p-6 text-center shadow-sm sm:p-8"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F0D9] text-xl font-bold text-[#967019]">
              !
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-[#38343A]">
              We couldn't find your orders
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#77716B]">
              No orders match this email address. Double-check your
              email and try again.
            </p>

            <button
              type="button"
              onClick={() => {
                setEmail("");
                setSearched(false);
              }}
              className="mt-5 rounded-xl border border-[#E4DCCF] px-5 py-2.5 text-sm font-bold text-[#38343A] transition hover:bg-[#FBF8F1]"
            >
              Try another email
            </button>

            <p className="mt-4 text-[11px] text-[#91897E]">
              This page searches orders available in the current browser.
            </p>
          </section>
        )}

        {/* Wider support section */}
        <section className="relative mt-8 w-full overflow-hidden rounded-3xl bg-[#38343A] shadow-[0_15px_40px_rgba(56,52,58,0.15)] sm:mt-10">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10"
          />

          <div
            aria-hidden="true"
            className="absolute -right-2 -top-12 h-48 w-48 rounded-full border border-[#D9AD32]/25"
          />

          <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:p-9 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D9AD32] text-[#38343A]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
                </svg>
              </div>

              <div className="max-w-2xl">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E6C66C]">
                  We're here to help
                </p>

                <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Need a hand with your order?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/65">
                  Have questions about your design, printing specifications,
                  payment, or delivery? Our team is ready to assist.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E2B32F] px-5 py-3 text-sm font-extrabold text-[#38343A] transition duration-200 hover:bg-[#F0C84D] active:scale-[0.99]"
            >
              Contact us on WhatsApp

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </section>

        <p className="mt-5 text-center text-[11px] leading-5 text-[#91897E]">
          Printora Studio · Print with purpose. Create with confidence.
        </p>
      </div>

      {/* Orders modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeOrdersModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="orders-modal-title"
            className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-[#F8F5EF] shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#E1D8CA] bg-white px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#967019]">
                  Search results
                </p>

                <h2
                  id="orders-modal-title"
                  className="mt-1 text-xl font-black text-[#38343A] sm:text-2xl"
                >
                  Your orders
                </h2>

                <p className="mt-1 break-all text-xs text-[#77716B]">
                  {email.trim()}
                </p>
              </div>

              <button
                type="button"
                onClick={closeOrdersModal}
                aria-label="Close orders popup"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E1D8CA] text-2xl text-[#38343A] transition hover:bg-[#FFF3CD]"
              >
                ×
              </button>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#E1D8CA] px-4 py-3 sm:px-6">
              <p className="text-xs text-[#77716B]">
                Select an order to view its complete details.
              </p>

              <span className="shrink-0 rounded-lg bg-[#FFF3CD] px-3 py-1.5 text-xs font-extrabold text-[#725514]">
                {results.length} {results.length === 1 ? "order" : "orders"}
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
              <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((order) => (
                  <article
                    key={order.id}
                    className="min-w-0 overflow-hidden rounded-xl border border-[#E1D8CA] bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-[#EEE8DE] p-3">
                      <div className="min-w-0">
                        <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#967019]">
                          Order reference
                        </p>

                        <h3 className="mt-1 break-all text-sm font-black text-[#38343A]">
                          {order.id || "Order"}
                        </h3>

                        <p className="mt-1 text-[10px] text-[#77716B]">
                          {formatDate(getOrderDate(order))}
                        </p>
                      </div>

                      <div className="max-w-[55%] shrink-0 text-right">
                        <StatusBadge status={order.status} />
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A8379]">
                        Product
                      </p>

                      <p className="mt-1 break-words text-sm font-extrabold text-[#38343A]">
                        {order.productName || "Printing product"}
                      </p>

                      <div className="mt-4 flex items-end justify-between gap-2">
                        <div>
                          <p className="text-[10px] text-[#77716B]">
                            Quantity
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#38343A]">
                            {Number(order.quantity || 0).toLocaleString("en-IN")}{" "}
                            units
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] text-[#77716B]">
                            Estimated total
                          </p>

                          <p className="mt-1 text-lg font-black text-[#38343A]">
                            {formatPrice(order.estimatedTotal)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {order.size && (
                          <span className="rounded-md bg-[#F0EDE7] px-2 py-1 text-[10px] font-semibold text-[#5F5953]">
                            Size: {order.size}
                          </span>
                        )}

                        {order.material && (
                          <span className="rounded-md bg-[#F0EDE7] px-2 py-1 text-[10px] font-semibold text-[#5F5953]">
                            {order.material}
                          </span>
                        )}

                        {order.paymentStatus && (
                          <span className="rounded-md bg-[#F0EDE7] px-2 py-1 text-[10px] font-semibold text-[#5F5953]">
                            {order.paymentStatus}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="mt-4 flex w-full items-center justify-between rounded-xl border border-[#DED5C4] px-3 py-3 text-xs font-bold text-[#38343A] transition hover:border-[#D9AD32] hover:bg-[#FFF9E8]"
                      >
                        View order details
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E1D8CA] bg-white px-4 py-3 sm:px-6">
              <p className="text-[10px] text-[#77716B] sm:text-xs">
                Printora Studio · Order tracking
              </p>

              <button
                type="button"
                onClick={closeOrdersModal}
                className="rounded-lg bg-[#38343A] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#514B53]"
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Order details modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedOrder(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-details-title"
            className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#E1D8CA] px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#967019]">
                  Complete order information
                </p>

                <h2
                  id="order-details-title"
                  className="mt-1 break-all text-lg font-black text-[#38343A] sm:text-xl"
                >
                  Order {selectedOrder.id || ""}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E1D8CA] text-2xl text-[#38343A] transition hover:bg-[#FFF3CD]"
              >
                ×
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="flex flex-col gap-4 rounded-2xl border border-[#E8DFD1] bg-[#FAF7F0] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8379]">
                    Product
                  </p>

                  <h3 className="mt-1 break-words text-lg font-black text-[#38343A]">
                    {selectedOrder.productName || "Printing product"}
                  </h3>

                  <p className="mt-1 text-xs text-[#77716B]">
                    {formatDate(getOrderDate(selectedOrder))}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#5F5953]">
                    {Number(selectedOrder.quantity || 0).toLocaleString("en-IN")}{" "}
                    units
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <StatusBadge status={selectedOrder.status} />

                  <div className="sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#77716B]">
                      Estimated total
                    </p>

                    <p className="mt-1 text-2xl font-black text-[#38343A]">
                      {formatPrice(selectedOrder.estimatedTotal)}
                    </p>

                    <p className="mt-1 text-xs text-[#77716B]">
                      {selectedOrder.paymentStatus || "Payment not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <section className="mt-6">
                <h3 className="text-sm font-extrabold text-[#38343A] sm:text-base">
                  Customer & delivery information
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-4 rounded-2xl border border-[#EEE8DE] p-4 sm:grid-cols-2 lg:grid-cols-3 sm:p-5">
                  <Detail
                    label="Customer name"
                    value={selectedOrder.customerName || selectedOrder.name}
                  />

                  <Detail label="Email address" value={selectedOrder.email} />

                  <Detail label="Phone number" value={selectedOrder.phone} />

                  <Detail
                    label="Quantity"
                    value={`${Number(selectedOrder.quantity || 0).toLocaleString("en-IN")} units`}
                  />

                  <Detail label="Printing size" value={selectedOrder.size} />

                  <Detail label="Material" value={selectedOrder.material} />

                  <Detail
                    label="Order date"
                    value={formatDate(getOrderDate(selectedOrder))}
                  />

                  <Detail
                    label="Payment status"
                    value={selectedOrder.paymentStatus}
                  />

                  <Detail
                    label="Delivery method"
                    value={
                      selectedOrder.deliveryMethod ||
                      selectedOrder.deliveryType
                    }
                  />

                  <div className="sm:col-span-2 lg:col-span-3">
                    <Detail
                      label="Delivery address"
                      value={
                        selectedOrder.address ||
                        selectedOrder.deliveryAddress
                      }
                    />
                  </div>

                  {selectedOrder.designName && (
                    <Detail
                      label="Uploaded design"
                      value={selectedOrder.designName}
                    />
                  )}

                  {selectedOrder.notes && (
                    <div className="sm:col-span-2">
                      <Detail
                        label="Additional instructions"
                        value={selectedOrder.notes}
                      />
                    </div>
                  )}
                </div>
              </section>

              <section className="mt-6">
                <h3 className="text-sm font-extrabold text-[#38343A] sm:text-base">
                  Price details
                </h3>

                <div className="mt-3 rounded-2xl border border-[#EEE8DE] p-4 sm:p-5">
                  <div className="space-y-3">
                    <PriceRow
                      label="Quantity"
                      value={`${Number(selectedOrder.quantity || 0).toLocaleString("en-IN")} units`}
                    />

                    {selectedOrder.unitPrice != null && (
                      <PriceRow
                        label="Price per unit"
                        value={formatPrice(selectedOrder.unitPrice)}
                      />
                    )}

                    {selectedOrder.shippingCost != null && (
                      <PriceRow
                        label="Delivery charges"
                        value={formatPrice(selectedOrder.shippingCost)}
                      />
                    )}

                    {selectedOrder.discount != null && (
                      <PriceRow
                        label="Discount"
                        value={`-${formatPrice(selectedOrder.discount)}`}
                      />
                    )}

                    <div className="border-t border-[#E5DCCB] pt-3">
                      <PriceRow
                        label="Estimated total"
                        value={formatPrice(selectedOrder.estimatedTotal)}
                        emphasized
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-[#77716B]">
                    Final pricing may depend on design approval and
                    confirmation by Printora Studio.
                  </p>
                </div>
              </section>

              <section className="mt-6">
                <h3 className="text-sm font-extrabold text-[#38343A] sm:text-base">
                  Order history
                </h3>

                <p className="mt-1 text-xs text-[#77716B]">
                  Recorded status updates for this order.
                </p>

                <div className="mt-4 rounded-2xl border border-[#EEE8DE] p-4 sm:p-5">
                  {getHistory(selectedOrder).length > 0 ? (
                    <div className="space-y-4">
                      {getHistory(selectedOrder).map((item, index) => (
                        <div
                          key={`${item.status}-${item.date}-${index}`}
                          className="flex gap-3"
                        >
                          <span
                            className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${index === 0
                                ? "bg-[#D9AD32]"
                                : "bg-[#B9B1A5]"
                              }`}
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                              <p className="break-words text-sm font-bold text-[#38343A]">
                                {item.status || "Status update"}
                              </p>

                              <p className="text-[11px] text-[#77716B] sm:shrink-0">
                                {formatDate(item.date)}
                              </p>
                            </div>

                            <p className="mt-1 text-xs leading-5 text-[#77716B]">
                              {item.note ||
                                "Your order status has been updated."}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#77716B]">
                      No additional history is available yet.
                    </p>
                  )}
                </div>
              </section>
            </div>

            <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E1D8CA] bg-[#FAF7F0] px-4 py-3 sm:px-6">
              <p className="text-[10px] text-[#77716B] sm:text-xs">
                Printora Studio · Order details
              </p>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-[#38343A] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#514B53]"
              >
                Back to orders
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}

function Detail({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium text-[#77716B]">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-semibold leading-5 text-[#38343A] sm:text-sm">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function PriceRow({ label, value, emphasized = false }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span
        className={`text-sm ${emphasized
            ? "font-bold text-[#38343A]"
            : "text-[#77716B]"
          }`}
      >
        {label}
      </span>

      <span
        className={`break-words text-right ${emphasized
            ? "text-lg font-black text-[#38343A]"
            : "text-sm font-semibold text-[#38343A]"
          }`}
      >
        {value}
      </span>
    </div>
  );
}

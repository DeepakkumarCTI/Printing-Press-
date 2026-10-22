import { useState } from "react";
import { useStore } from "../context/StoreContext";
import StatusBadge from "../components/StatusBadge";
import FormField, { inputClass } from "../components/FormField";
import Button from "../components/Button";

export default function TrackOrder() {
  const { orders } = useStore();

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    const found = orders.find(
      (order) =>
        String(order.id).trim().toLowerCase() ===
          id.trim().toLowerCase() &&
        String(order.email || "").trim().toLowerCase() ===
          email.trim().toLowerCase()
    );

    setResult(found || null);
    setSearched(true);
  };

  const resetSearch = () => {
    setId("");
    setEmail("");
    setResult(null);
    setSearched(false);
  };

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

  const getHistory = (order) => {
    const history = Array.isArray(order.history)
      ? [...order.history]
      : [];

    // Include the current status if it is not already in the history.
    const hasCurrentStatus = history.some(
      (item) =>
        String(item.status).toLowerCase() ===
        String(order.status || "").toLowerCase()
    );

    if (order.status && !hasCurrentStatus) {
      history.push({
        status: order.status,
        date: order.updatedAt || order.createdAt || order.date,
        note: "Current order status",
      });
    }

    return history.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();

      return dateB - dateA;
    });
  };

  const orderHistory = result ? getHistory(result) : [];

  const createdDate =
    result?.createdAt || result?.orderDate || result?.date;

  return (
    <div className="min-h-[65vh] bg-printora-warm px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#967019]">
            Order updates
          </p>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-printora-charcoal sm:text-4xl lg:text-5xl">
            Track your order
          </h1>

          <p className="mt-4 text-sm leading-7 text-printora-muted sm:text-base">
            Check your order details, current status, pricing, and complete
            order history in one place.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={submit}
          className="mx-auto mt-8 max-w-2xl rounded-3xl border border-printora-line bg-white p-5 shadow-soft sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-lg font-extrabold text-printora-charcoal">
              Find your order
            </h2>

            <p className="mt-1 text-sm leading-6 text-printora-muted">
              Enter the order ID and email address used when placing your
              order.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Order ID" required>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className={inputClass}
                placeholder="e.g. PS-1234567"
                required
              />
            </FormField>

            <FormField label="Email address" required>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
                required
              />
            </FormField>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="w-full">
              Track my order
            </Button>

            {searched && (
              <button
                type="button"
                onClick={resetSearch}
                className="w-full rounded-xl border border-printora-line px-5 py-3 text-sm font-bold text-printora-charcoal transition hover:bg-printora-warm sm:w-auto"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Search Results */}
        {searched && !result && (
          <div
            role="alert"
            className="mx-auto mt-8 max-w-2xl rounded-2xl border border-red-200 bg-white p-6 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-600">
              !
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-printora-charcoal">
              Order not found
            </h2>

            <p className="mt-2 text-sm leading-6 text-printora-muted">
              We couldn't find an order matching those details. Please check
              your order ID and email address and try again.
            </p>

            <p className="mt-2 text-xs text-printora-muted">
              Only orders saved in this browser's Local Storage can be
              searched in this demo.
            </p>
          </div>
        )}

        {result && (
          <div className="mt-10 space-y-6">
            {/* Order Summary */}
            <section className="overflow-hidden rounded-3xl border border-printora-line bg-white shadow-soft">
              <div className="flex flex-col gap-4 border-b border-printora-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-printora-muted">
                    Order reference
                  </p>

                  <h2 className="mt-2 break-all text-2xl font-extrabold text-printora-charcoal">
                    {result.id}
                  </h2>

                  <p className="mt-2 text-sm text-printora-muted">
                    Placed on {formatDate(createdDate)}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <p className="text-xs font-bold uppercase tracking-wider text-printora-muted">
                    Current status
                  </p>

                  <StatusBadge status={result.status} />
                </div>
              </div>

              {/* Order Status Overview */}
              <div className="grid grid-cols-1 gap-4 bg-printora-warm p-5 sm:grid-cols-3 sm:p-7">
                <div className="rounded-2xl border border-printora-line bg-white p-4">
                  <p className="text-xs font-medium text-printora-muted">
                    Order quantity
                  </p>

                  <p className="mt-2 text-2xl font-extrabold text-printora-charcoal">
                    {Number(result.quantity || 0).toLocaleString("en-IN")}
                  </p>

                  <p className="mt-1 text-xs text-printora-muted">
                    Units ordered
                  </p>
                </div>

                <div className="rounded-2xl border border-printora-line bg-white p-4">
                  <p className="text-xs font-medium text-printora-muted">
                    Estimated total
                  </p>

                  <p className="mt-2 text-2xl font-extrabold text-printora-charcoal">
                    {formatPrice(result.estimatedTotal)}
                  </p>

                  <p className="mt-1 text-xs text-printora-muted">
                    Order amount
                  </p>
                </div>

                <div className="rounded-2xl border border-printora-line bg-white p-4">
                  <p className="text-xs font-medium text-printora-muted">
                    Product
                  </p>

                  <p className="mt-2 break-words text-lg font-extrabold text-printora-charcoal">
                    {result.productName || "Printing product"}
                  </p>

                  <p className="mt-1 text-xs text-printora-muted">
                    Custom printing order
                  </p>
                </div>
              </div>
            </section>

            {/* Order Details */}
            <section className="rounded-3xl border border-printora-line bg-white p-5 shadow-soft sm:p-7">
              <div className="border-b border-printora-line pb-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#967019]">
                  Order information
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-printora-charcoal sm:text-2xl">
                  Order details
                </h2>
              </div>

              <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <Detail
                  label="Order ID"
                  value={result.id}
                />

                <Detail
                  label="Customer name"
                  value={result.customerName || result.name || "Not provided"}
                />

                <Detail
                  label="Email address"
                  value={result.email}
                />

                <Detail
                  label="Phone number"
                  value={result.phone || "Not provided"}
                />

                <Detail
                  label="Product"
                  value={result.productName || "Not provided"}
                />

                <Detail
                  label="Quantity"
                  value={`${Number(result.quantity || 0).toLocaleString("en-IN")} units`}
                />

                <Detail
                  label="Printing size"
                  value={result.size || "Not specified"}
                />

                <Detail
                  label="Material"
                  value={result.material || "Not specified"}
                />

                <Detail
                  label="Order date"
                  value={formatDate(createdDate)}
                />

                <Detail
                  label="Payment status"
                  value={result.paymentStatus || "Not provided"}
                />

                <Detail
                  label="Delivery address"
                  value={result.address || result.deliveryAddress || "Not provided"}
                />

                <Detail
                  label="Consultation / delivery method"
                  value={result.deliveryMethod || result.deliveryType || "Not specified"}
                />
              </div>

              {result.designName && (
                <div className="mt-6 border-t border-printora-line pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-printora-muted">
                    Uploaded design
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-printora-charcoal">
                    {result.designName}
                  </p>
                </div>
              )}

              {result.notes && (
                <div className="mt-6 border-t border-printora-line pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-printora-muted">
                    Additional instructions
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-printora-muted">
                    {result.notes}
                  </p>
                </div>
              )}
            </section>

            {/* Price Details */}
            <section className="rounded-3xl border border-printora-line bg-white p-5 shadow-soft sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#967019]">
                Payment summary
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-printora-charcoal">
                Price details
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-printora-muted">
                    Product
                  </span>

                  <span className="text-right text-sm font-semibold text-printora-charcoal">
                    {result.productName || "Printing product"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-printora-muted">
                    Quantity
                  </span>

                  <span className="text-sm font-semibold text-printora-charcoal">
                    {Number(result.quantity || 0).toLocaleString("en-IN")} units
                  </span>
                </div>

                {result.unitPrice != null && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-printora-muted">
                      Price per unit
                    </span>

                    <span className="text-sm font-semibold text-printora-charcoal">
                      {formatPrice(result.unitPrice)}
                    </span>
                  </div>
                )}

                {result.shippingCost != null && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-printora-muted">
                      Delivery charges
                    </span>

                    <span className="text-sm font-semibold text-printora-charcoal">
                      {formatPrice(result.shippingCost)}
                    </span>
                  </div>
                )}

                {result.discount != null && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-printora-muted">
                      Discount
                    </span>

                    <span className="text-sm font-semibold text-printora-charcoal">
                      -{formatPrice(result.discount)}
                    </span>
                  </div>
                )}

                <div className="border-t border-printora-line pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-printora-charcoal">
                      Estimated total
                    </span>

                    <span className="text-2xl font-extrabold text-printora-charcoal">
                      {formatPrice(result.estimatedTotal)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-printora-muted">
                    Final pricing may depend on design approval, printing
                    specifications, and confirmation by Printora Studio.
                  </p>
                </div>
              </div>
            </section>

            {/* Order History */}
            <section className="rounded-3xl border border-printora-line bg-white p-5 shadow-soft sm:p-7">
              <div className="border-b border-printora-line pb-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#967019]">
                  Order progress
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-printora-charcoal sm:text-2xl">
                  Order history
                </h2>

                <p className="mt-2 text-sm leading-6 text-printora-muted">
                  Review the status updates recorded for your order.
                </p>
              </div>

              {orderHistory.length > 0 ? (
                <div className="mt-7">
                  {orderHistory.map((item, index) => (
                    <div key={`${item.status}-${item.date}-${index}`} className="relative flex gap-4 pb-8 last:pb-0">
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <span
                          className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-4 border-white ${
                            index === 0
                              ? "bg-[#D9AD32] text-white"
                              : "bg-[#F5F3EF] text-printora-charcoal"
                          }`}
                        >
                          <span className="h-2.5 w-2.5 rounded-full bg-current" />
                        </span>

                        {index !== orderHistory.length - 1 && (
                          <span className="absolute mt-9 h-[calc(100%-2.25rem)] w-px bg-printora-line" />
                        )}
                      </div>

                      {/* History Information */}
                      <div className="min-w-0 flex-1 pb-2">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <h3 className="break-words text-sm font-extrabold text-printora-charcoal sm:text-base">
                            {item.status || "Status update"}
                          </h3>

                          <span className="shrink-0 text-xs text-printora-muted">
                            {formatDate(item.date)}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-printora-muted">
                          {item.note || "Your order status has been updated."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-printora-warm p-5">
                  <p className="font-bold text-printora-charcoal">
                    No additional history available
                  </p>

                  <p className="mt-2 text-sm leading-6 text-printora-muted">
                    Your current order status is shown above. Further updates
                    will appear here when they are recorded by the
                    administrator.
                  </p>
                </div>
              )}
            </section>

            {/* Support */}
            <section className="rounded-3xl border border-[#E9D8A4] bg-[#FFF9E8] p-5 sm:p-7">
              <h2 className="text-lg font-extrabold text-printora-charcoal">
                Need help with your order?
              </h2>

              <p className="mt-2 text-sm leading-6 text-printora-muted">
                Contact Printora Studio if you have questions about your
                printing specifications, payment, or delivery.
              </p>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-printora-charcoal px-6 py-3 text-sm font-bold text-white transition hover:bg-[#514B53] sm:w-auto"
              >
                Contact us on WhatsApp
              </a>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-printora-muted">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold leading-6 text-printora-charcoal">
        {value || "Not provided"}
      </p>
    </div>
  );
}
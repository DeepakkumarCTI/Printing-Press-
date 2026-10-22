import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useStore } from "../context/StoreContext";

function SuccessLayout({ eyebrow, title, description, id, action }) {
  return <div className="mx-auto flex min-h-[65vh] max-w-3xl items-center justify-center px-4 py-14"><div className="w-full rounded-3xl border border-printora-line bg-white p-8 text-center shadow-soft sm:p-12"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8edca] text-3xl font-bold text-[#76570a]">✓</div><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#967019]">{eyebrow}</p><h1 className="mt-3 text-3xl font-extrabold text-printora-charcoal sm:text-4xl">{title}</h1><p className="mx-auto mt-4 max-w-xl leading-7 text-printora-muted">{description}</p>{id && <div className="mx-auto mt-6 max-w-sm rounded-xl bg-printora-warm p-4"><p className="text-xs text-printora-muted">Reference ID</p><p className="mt-1 text-xl font-extrabold">{id}</p><p className="mt-2 text-xs text-printora-muted">Keep this ID for your records.</p></div>}<div className="mt-8 flex flex-wrap justify-center gap-3">{action}</div></div></div>;
}
export function OrderSuccess() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);
  return <SuccessLayout eyebrow="Order request received" title="Thanks for choosing Printora." description={order ? `We've recorded your request for ${order.productName}. You can use the order ID and your email to check status updates.` : "Your order request was submitted."} id={id} action={<><Button to="/track">Track order</Button><Button to="/products" variant="outline">Continue browsing</Button></>} />;
}
export function QuoteSuccess() {
  const { id } = useParams();
  return <SuccessLayout eyebrow="Quote request submitted" title="We'll help bring it to print." description="Your quote request has been saved in this browser demo. The reference below can help you identify the request." id={id} action={<><Button to="/products">Browse products</Button><Button to="/" variant="outline">Back to home</Button></>} />;
}

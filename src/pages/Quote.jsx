import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import FormField, { inputClass } from "../components/FormField";
import Button from "../components/Button";

export default function Quote() {
  const { createQuote, products } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", product: "", quantity: "", size: "", material: "", deadline: "", details: "" });
  const [error, setError] = useState("");
  const change = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.details.trim()) { setError("Please complete your name, email, phone, and project details."); return; }
    const quote = createQuote(form);
    navigate(`/quote-success/${quote.id}`);
  };
  return <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-16">
    <aside><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#967019]">Custom project enquiry</p><h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-printora-charcoal">Let's make something worth keeping.</h1><p className="mt-5 leading-8 text-printora-muted">Tell us what you need and we will record your quote request. Include sizes, material preferences, quantity, and any deadlines you already know.</p><div className="mt-8 rounded-2xl bg-printora-warm p-5"><h2 className="font-bold">Contact Printora Studio</h2><p className="mt-3 text-sm leading-6 text-printora-muted">24, Main Road, Palayamkottai,<br/>Tirunelveli, Tamil Nadu – 627002, India</p><a className="mt-3 block text-sm font-semibold hover:underline" href="tel:+919876543210">+91 98765 43210</a><a className="mt-1 block break-all text-sm font-semibold hover:underline" href="mailto:printorastudio@example.com">printorastudio@example.com</a></div></aside>
    <form onSubmit={submit} className="rounded-3xl border border-printora-line bg-white p-5 shadow-soft sm:p-8">
      <h2 className="text-xl font-extrabold">Request a quote</h2><p className="mt-2 text-sm text-printora-muted">Fields marked * are required.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" required><input value={form.name} onChange={(e)=>change("name",e.target.value)} className={inputClass} placeholder="Your name"/></FormField>
        <FormField label="Email address" required><input type="email" value={form.email} onChange={(e)=>change("email",e.target.value)} className={inputClass} placeholder="you@example.com"/></FormField>
        <FormField label="Phone number" required><input value={form.phone} onChange={(e)=>change("phone",e.target.value)} className={inputClass} placeholder="+91..."/></FormField>
        <FormField label="Product / service"><select value={form.product} onChange={(e)=>change("product",e.target.value)} className={inputClass}><option value="">Select a service</option>{products.map((p)=><option key={p.id}>{p.name}</option>)}<option>Other / custom project</option></select></FormField>
        <FormField label="Estimated quantity"><input value={form.quantity} onChange={(e)=>change("quantity",e.target.value)} className={inputClass} placeholder="e.g. 500 pieces"/></FormField>
        <FormField label="Required by"><input type="date" value={form.deadline} onChange={(e)=>change("deadline",e.target.value)} className={inputClass}/></FormField>
        <FormField label="Size / dimensions"><input value={form.size} onChange={(e)=>change("size",e.target.value)} className={inputClass} placeholder="e.g. A4 or 3 × 5 ft"/></FormField>
        <FormField label="Material / finish"><input value={form.material} onChange={(e)=>change("material",e.target.value)} className={inputClass} placeholder="e.g. matte, glossy, cotton"/></FormField>
      </div>
      <FormField label="Project details" required><textarea rows="5" value={form.details} onChange={(e)=>change("details",e.target.value)} className={inputClass} placeholder="Describe your design, printing requirements, quantity, and any special instructions."/></FormField>
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <Button type="submit" className="mt-5 w-full">Submit quote request</Button>
      <p className="mt-3 text-center text-xs text-printora-muted">Your request is saved locally in this browser demo.</p>
    </form>
  </div>;
}

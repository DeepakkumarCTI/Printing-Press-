import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Button from "../components/Button";
import FormField, { inputClass } from "../components/FormField";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, createOrder } = useStore();
  const product = products.find((p) => p.id === id && p.active);
  const navigate = useNavigate();
  const [size, setSize] = useState(product?.sizes?.[0] || "");
  const [material, setMaterial] = useState(product?.materials?.[0] || "");
  const [quantity, setQuantity] = useState(100);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [design, setDesign] = useState(null);
  const [designName, setDesignName] = useState("");
  const [error, setError] = useState("");

  const total = useMemo(() => {
    const q = Math.max(1, Number(quantity) || 1);
    if (product?.category === "Large Format") return Math.round(Number(product.price) * q);
    const baseQty = product?.unit?.includes("100") ? 100 : 1;
    return Math.round(Number(product?.price || 0) * (q / baseQty));
  }, [product, quantity]);

  if (!product) return <div className="mx-auto max-w-4xl px-4 py-20 text-center"><h1 className="text-2xl font-bold">Product not found</h1><Link className="mt-4 inline-block underline" to="/products">Back to products</Link></div>;

  const handleDesign = (file) => {
    setError("");
    if (!file) return;
    if (file.size > 800 * 1024) {
      setError("Please upload a file smaller than 800 KB for this local demo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => { setDesign(reader.result); setDesignName(file.name); };
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) { setError("Please fill in your name, email, and phone number."); return; }
    const order = createOrder({
      customerName: name.trim(), email: email.trim(), phone: phone.trim(),
      productId: product.id, productName: product.name, category: product.category,
      size, material, quantity: Math.max(1, Number(quantity) || 1), estimatedTotal: total,
      notes, design, designName
    });
    navigate(`/order-success/${order.id}`);
  };

  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <div className="mb-6 text-sm text-printora-muted"><Link to="/products" className="hover:text-printora-charcoal">Products</Link> <span className="mx-2">/</span> {product.name}</div>
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <div className="overflow-hidden rounded-3xl bg-printora-warm"><img src={product.image} alt={product.name} className="h-[320px] w-full object-cover sm:h-[500px]" /></div>
        <div className="mt-5 rounded-2xl bg-printora-warm p-5"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#967019]">Product details</p><p className="mt-2 text-sm leading-7 text-printora-muted">{product.description}</p><p className="mt-3 text-sm text-printora-muted">Starting price: <strong className="text-printora-charcoal">₹{Number(product.price).toLocaleString("en-IN")}</strong> / {product.unit}</p></div>
      </div>
      <div>
        <span className="rounded-full bg-[#f8edca] px-3 py-1.5 text-xs font-bold text-[#76570a]">{product.category}</span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-printora-charcoal sm:text-4xl">{product.name}</h1>
        <p className="mt-4 leading-7 text-printora-muted">Customise your print below. Your total is an estimate; the team can confirm the final price if your specifications require special handling.</p>
        <form onSubmit={submit} className="mt-7 space-y-5 rounded-2xl border border-printora-line bg-white p-5 shadow-soft sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Printing size" required><select value={size} onChange={(e) => setSize(e.target.value)} className={inputClass}>{product.sizes.map((s) => <option key={s}>{s}</option>)}</select></FormField>
            <FormField label="Material" required><select value={material} onChange={(e) => setMaterial(e.target.value)} className={inputClass}>{product.materials.map((m) => <option key={m}>{m}</option>)}</select></FormField>
          </div>
          <FormField label={product.category === "Large Format" ? "Quantity (square feet)" : "Quantity"} required hint={product.unit.includes("100") ? "The estimate scales from the listed 100-unit base price." : "Enter the number of units you need."}><input type="number" min="1" max="100000" value={quantity} onChange={(e) => setQuantity(e.target.value)} className={inputClass} /></FormField>
          <div className="rounded-xl bg-printora-pale p-4"><p className="text-sm text-printora-muted">Estimated total</p><p className="mt-1 text-3xl font-extrabold text-printora-charcoal">₹{total.toLocaleString("en-IN")}</p><p className="mt-1 text-xs text-printora-muted">Final pricing may vary by finish and artwork.</p></div>
          <div className="border-t border-printora-line pt-5"><h2 className="text-lg font-bold text-printora-charcoal">Your details</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FormField label="Full name" required><input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your name" /></FormField>
            <FormField label="Email address" required><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" /></FormField>
            <FormField label="Phone number" required><input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+91..." /></FormField>
            <FormField label="Upload your design" hint="PNG, JPG, or PDF; max 800 KB for this demo."><input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={(e) => handleDesign(e.target.files?.[0])} className="mt-2 block w-full text-xs text-printora-muted file:mr-3 file:rounded-lg file:border-0 file:bg-printora-warm file:px-3 file:py-2 file:font-semibold file:text-printora-charcoal" />{designName && <span className="mt-2 block text-xs text-[#8a6816]">Attached: {designName}</span>}</FormField>
          </div></div>
          <FormField label="Additional instructions"><textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} placeholder="Colours, finish, delivery notes, or anything else..." /></FormField>
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <Button type="submit" className="w-full">Place order request</Button>
          <p className="text-center text-xs leading-5 text-printora-muted">This demo records your request in this browser. Payment is not collected online.</p>
        </form>
      </div>
    </div>
  </div>;
}

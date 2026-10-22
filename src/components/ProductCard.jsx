import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product.active) return null;
  return (
    <article className="group overflow-hidden rounded-2xl border border-printora-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/products/${product.id}`} className="block overflow-hidden bg-printora-warm">
        <img src={product.image} alt={product.name} loading="lazy" className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60" />
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-printora-pale px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#8a6816]">{product.category}</span>
          {product.tag && <span className="text-xs font-semibold text-printora-muted">{product.tag}</span>}
        </div>
        <Link to={`/products/${product.id}`}><h3 className="mt-4 text-lg font-bold text-printora-charcoal hover:text-[#8a6816]">{product.name}</h3></Link>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-printora-muted">{product.description}</p>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div><p className="text-xs text-printora-muted">Starting from</p><p className="mt-1 text-xl font-extrabold text-printora-charcoal">₹{Number(product.price).toLocaleString("en-IN")}<span className="ml-1 text-xs font-medium text-printora-muted">/ {product.unit}</span></p></div>
          <Link to={`/products/${product.id}`} className="rounded-xl bg-printora-mustard px-4 py-2.5 text-sm font-bold text-printora-charcoal transition hover:bg-[#c89b22]">Customize</Link>
        </div>
      </div>
    </article>
  );
}

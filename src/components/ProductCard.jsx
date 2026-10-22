
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product.active) return null;

  const productUrl = `/products/${product.id}`;

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-printora-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      {/* Product Image */}
      <Link
        to={productUrl}
        className="block overflow-hidden bg-printora-warm"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-28 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52 sm:group-hover:scale-105 lg:h-60"
        />
      </Link>

      {/* Product Details */}
      <div className="min-w-0 p-3 sm:p-5">
        {/* Category and Tag */}
        <div className="flex min-w-0 flex-wrap items-start gap-2">
          <span className="max-w-full rounded-full bg-printora-pale px-2.5 py-1 text-[10px] font-bold uppercase leading-4 tracking-wide text-[#8a6816] sm:px-3 sm:text-[11px]">
            {product.category}
          </span>

          {product.tag && (
            <span className="min-w-0 break-words pt-1 text-[10px] font-semibold leading-4 text-printora-muted sm:text-xs">
              {product.tag}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link to={productUrl}>
          <h3 className="mt-3 break-words text-base font-bold leading-6 text-printora-charcoal hover:text-[#8a6816] sm:mt-4 sm:text-lg">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 line-clamp-2 min-h-10 break-words text-xs leading-5 text-printora-muted sm:min-h-12 sm:text-sm sm:leading-6">
          {product.description}
        </p>

        {/* Price and Customize Button */}
        <div className="mt-4 flex min-w-0 flex-col items-start gap-3 sm:mt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <p className="text-xs text-printora-muted">
              Starting from
            </p>

            <p className="mt-1 break-words text-lg font-extrabold leading-6 text-printora-charcoal sm:text-xl">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            <p className="mt-1 break-words text-xs leading-5 text-printora-muted sm:text-sm">
              / {product.unit}
            </p>
          </div>

          <Link
            to={productUrl}
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl bg-printora-mustard px-3 py-2.5 text-xs font-bold text-printora-charcoal transition hover:bg-[#c89b22] sm:w-auto sm:px-4 sm:text-sm"
          >
            Customize
          </Link>
        </div>
      </div>
    </article>
  );
}

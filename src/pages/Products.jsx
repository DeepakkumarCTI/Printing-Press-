import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";

export default function Products() {
  const { products } = useStore();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const shown = useMemo(
    () =>
      products.filter(
        (p) =>
          p.active &&
          (category === "All" || p.category === category) &&
          `${p.name} ${p.description} ${p.category}`
            .toLowerCase()
            .includes(search.toLowerCase().trim())
      ),
    [products, category, search]
  );

  return (
    <div className="min-h-[60vh] overflow-hidden bg-printora-warm">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-[#38343A]">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#D9AD32]/15 blur-3xl" />
        <div className="absolute -bottom-28 left-1/4 h-56 w-56 rounded-full bg-[#D9AD32]/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E8BD49]">
            <span className="h-2 w-2 rounded-full bg-[#D9AD32]" />
            Product catalog
          </span>

          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find the right print
            <span className="block text-[#E8BD49]">
              for your next idea.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Explore our printing products, choose your preferred options,
            and customise your order to match your requirements.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-white/80 sm:text-sm">
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              Custom printing
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              Flexible quantities
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              Personalised orders
            </span>
          </div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mb-7">
          <SectionHeading
            eyebrow="Explore our collection"
            title="Our printing products"
            description="Choose a category or search for a product to get started."
          />
        </div>

        {/* Search and Filters */}
        <div className="rounded-2xl border border-[#E5DCCB] bg-[#F9F6EF] p-4 sm:p-5">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8C8579]"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-xl border border-[#DED5C4] bg-white py-3.5 pl-11 pr-4 text-sm text-printora-charcoal outline-none transition placeholder:text-[#9B958A] focus:border-[#D9AD32] focus:ring-2 focus:ring-[#D9AD32]/20"
              />
            </div>

            {/* Category Filters */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-printora-muted">
                Browse categories
              </p>

              <div className="-mx-1 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`rounded-full px-4 py-2.5 text-xs font-bold transition duration-200 sm:text-sm ${
                      category === c
                        ? "bg-[#38343A] text-white shadow-sm"
                        : "border border-[#DED5C4] bg-white text-printora-charcoal hover:border-[#D9AD32] hover:bg-[#F7EBC8]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-7 flex items-center justify-between gap-3 border-b border-[#E5DCCB] pb-4">
          <p className="text-sm text-printora-muted">
            Showing{" "}
            <span className="font-extrabold text-printora-charcoal">
              {shown.length}
            </span>{" "}
            product{shown.length === 1 ? "" : "s"}
          </p>

          {category !== "All" || search ? (
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setSearch("");
              }}
              className="shrink-0 text-xs font-bold text-[#967019] transition hover:text-printora-charcoal sm:text-sm"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {/* Product Grid */}
        {shown.length > 0 ? (
          <motion.div
            layout
            className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
          >
            {shown.map((p, index) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.05, 0.2),
                }}
                className="min-w-0"
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <div className="mt-8 rounded-2xl border border-dashed border-[#D8CDB8] bg-[#F9F6EF] px-5 py-14 text-center sm:py-16">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D9AD32]/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-7 w-7 text-[#967019]"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
                <path d="M8.5 11h5" />
              </svg>
            </div>

            <h3 className="mt-5 text-lg font-extrabold text-printora-charcoal">
              No products found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-printora-muted">
              We couldn't find products matching your search. Try another
              keyword or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setSearch("");
              }}
              className="mt-5 rounded-xl bg-[#D9AD32] px-5 py-3 text-sm font-bold text-[#38343A] transition hover:bg-[#E8BD49]"
            >
              View all products
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
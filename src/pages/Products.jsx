
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

  const hasFilters = category !== "All" || search.trim() !== "";

  const clearFilters = () => {
    setCategory("All");
    setSearch("");
  };

  return (
    <div className="min-h-[60vh] w-full overflow-hidden bg-[#F7F5F0]">
      {/* Premium Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#302C31]">
        {/* Background Image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/products.jpg')",
          }}
        />

        {/* Readability Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#211E23]/90 via-[#211E23]/70 to-[#211E23]/35" />

        {/* Decorative Gold Glow */}
        <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-[#D9AD32]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-64 w-64 rounded-full bg-[#D9AD32]/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-[4.5rem] xl:px-12"
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8BD49]/30 bg-black/15 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C957] backdrop-blur-sm sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8BD49]" />
              Product catalog
            </span>

            <h1 className="mt-5 text-3xl font-black leading-[1.12] tracking-tight text-white sm:mt-6 sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
              Find the right print
              <span className="mt-1 block text-[#E8BD49]">
                for your next idea.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:mt-5 sm:text-base sm:leading-7">
              Explore our printing products, choose your preferred options,
              and customise every detail to bring your ideas to life.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
              {[
                "Custom printing",
                "Flexible quantities",
                "Personalised orders",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/15 bg-white/[0.08] px-3.5 py-2.5 text-xs font-semibold text-white/90 backdrop-blur-sm sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Product Collection */}
      <section className="mx-auto w-full max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-11 xl:px-12">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-7">
          <SectionHeading
            eyebrow="Explore our collection"
            title="Our printing products"
            description="Find the right products for your business, event, or creative project."
          />
        </div>

        {/* Search and Category Panel */}
        <div className="rounded-2xl border border-[#E5DCCB] bg-[#FBF9F4] p-3.5 shadow-[0_4px_20px_rgba(56,52,58,0.035)] sm:rounded-3xl sm:p-5 lg:p-6">
          <div className="flex flex-col gap-5">
            {/* Search Field */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#948B7D]"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product name, type, or category..."
                aria-label="Search products"
                className="w-full rounded-xl border border-[#E3DACA] bg-white py-3.5 pl-12 pr-4 text-sm text-[#38343A] outline-none transition duration-200 placeholder:text-[#A29A8E] hover:border-[#CDBF9F] focus:border-[#C49A22] focus:ring-4 focus:ring-[#D9AD32]/10 sm:py-4"
              />
            </div>

            {/* Category Filters */}
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#777066] sm:text-xs">
                  Browse categories
                </p>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-bold text-[#967019] transition hover:text-[#38343A]"
                  >
                    Reset filters
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`rounded-full border px-4 py-2.5 text-xs font-bold transition-all duration-200 sm:px-5 sm:py-3 sm:text-sm ${category === c
                        ? "border-[#38343A] bg-[#38343A] text-white shadow-sm"
                        : "border-[#E3DACA] bg-white text-[#38343A] hover:border-[#D9AD32] hover:bg-[#F8F0D9]"
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DCCB] pb-4 sm:mt-7">
          <p className="text-sm text-[#777066]">
            Showing{" "}
            <span className="font-extrabold text-[#38343A]">
              {shown.length}
            </span>{" "}
            {shown.length === 1 ? "product" : "products"}
            {category !== "All" && (
              <span className="text-[#967019]"> in {category}</span>
            )}
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-bold text-[#967019] transition hover:text-[#38343A] sm:text-sm"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {shown.length > 0 ? (
          <motion.div
            layout
            className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
          >
            {shown.map((p, index) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.045, 0.18),
                }}
                className="min-w-0"
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <div className="mt-6 rounded-2xl border border-dashed border-[#D8CDB8] bg-[#FBF9F4] px-5 py-12 text-center sm:py-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D9AD32]/15">
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

            <h3 className="mt-4 text-lg font-extrabold text-[#38343A]">
              No products found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#777066]">
              We couldn't find products matching your search. Try another
              keyword or choose a different category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-[#D9AD32] px-5 py-3 text-sm font-bold text-[#38343A] transition hover:bg-[#E8BD49] focus:outline-none focus:ring-4 focus:ring-[#D9AD32]/25"
            >
              View all products
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

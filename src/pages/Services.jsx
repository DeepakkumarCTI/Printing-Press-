
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import servicesImage from "../assets/services.jpg";

const items = [
  {
    no: "01",
    category: "BUSINESS PRINTING",
    title: "Visiting Cards & Brochures",
    text: "Make every introduction count with professionally printed business cards, flyers, brochures, menus, and stationery.",
    details: [
      "Premium paper stocks and elegant finishes",
      "Custom sizes, layouts, and quantities",
      "Perfect for businesses, shops, and events",
    ],
    image:
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1200&q=85",
    accent: "mustard",
  },
  {
    no: "02",
    category: "LARGE-FORMAT PRINTING",
    title: "Banners & Flex Printing",
    text: "Make your message impossible to miss with bold banners and large-format prints designed for promotions and events.",
    details: [
      "Made to your preferred dimensions",
      "Indoor and outdoor printing options",
      "Support with artwork sizing and layout",
    ],
    image:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=85",
    accent: "charcoal",
  },
  {
    no: "03",
    category: "CUSTOM APPAREL",
    title: "T-shirt Printing",
    text: "Turn your ideas into wearable designs for business uniforms, celebrations, school events, and team merchandise.",
    details: [
      "Multiple sizes and fabric options",
      "Bring your own artwork or design",
      "Individual orders and bulk quantities",
    ],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
    accent: "mustard",
  },
  {
    no: "04",
    category: "PERSONALISED MERCHANDISE",
    title: "Customised Gifts",
    text: "Create thoughtful, memorable gifts with personalised designs for birthdays, celebrations, corporate events, and special occasions.",
    details: [
      "Personalised artwork and messages",
      "Business gifts and event merchandise",
      "Custom requests and bulk quotations",
    ],
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85",
    accent: "charcoal",
  },
];

const benefits = [
  {
    number: "01",
    title: "Made to your needs",
    text: "Choose your preferred size, material, finish, and quantity.",
  },
  {
    number: "02",
    title: "Personalised service",
    text: "Get help selecting the right printing option for your project.",
  },
  {
    number: "03",
    title: "Simple quotations",
    text: "Share your requirements and receive pricing for your order.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export default function Services() {
  return (
    <div className="w-full overflow-hidden bg-printora-warm">
      {/* Hero Section */}
      <section className="relative isolate w-full overflow-hidden bg-[#38343A] text-white">
        {/* Full-Width Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${servicesImage})` }}
        />

        {/* Dark Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[#211E20]/25"
        />

        {/* Gradient Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#211E20]/95 via-[#211E20]/80 to-[#211E20]/55"
        />

        {/* Gold Decorative Effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 z-0 h-80 w-80 rounded-full bg-[#D9AD32]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/4 z-0 h-72 w-72 rounded-full bg-[#D9AD32]/10 blur-3xl"
        />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-7 px-3 py-8 sm:gap-9 sm:px-4 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-5 lg:py-12 xl:gap-12 xl:px-6">
          {/* Left Content */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0CB62] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#D9AD32]" />
              What we do
            </span>

            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.1] tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl">
              Great ideas deserve
              <span className="mt-2 block text-[#E8BD49]">
                great printing.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">
              From everyday business essentials to personalised merchandise,
              we bring your ideas to life with printing that makes an impression.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
              <Button to="/quote">
                Request a Quote
              </Button>

              <Link
                to="/products"
                className="group inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition duration-300 hover:border-[#D9AD32] hover:bg-white/10"
              >
                Explore Products
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Statistics */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 border-t border-white/20 pt-5 sm:mt-9 sm:gap-x-8 sm:pt-6">
              <div>
                <p className="text-2xl font-black text-[#E8BD49]">04</p>
                <p className="mt-1 text-xs text-white/70">
                  Core service categories
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-[#E8BD49]">Custom</p>
                <p className="mt-1 text-xs text-white/70">
                  Sizes and specifications
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-[#E8BD49]">Flexible</p>
                <p className="mt-1 text-xs text-white/70">
                  Order requirements
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.15,
            }}
            className="relative"
          >
            <div className="absolute -right-3 -top-3 h-20 w-20 rounded-3xl border border-[#D9AD32]/60 sm:-right-5 sm:-top-5 sm:h-24 sm:w-24" />

            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#211E20]/40 p-2 shadow-2xl backdrop-blur-sm">
              <img
                src={servicesImage}
                alt="Printora printing services and creative workspace"
                loading="lazy"
                className="h-[260px] w-full rounded-2xl object-cover sm:h-[350px] lg:h-[400px] xl:h-[430px]"
              />

              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-[#211E20]/90 p-4 backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E8BD49]">
                  Your vision, our print
                </p>

                <p className="mt-2 text-lg font-extrabold text-white sm:text-xl">
                  From concept to creation.
                </p>

                <p className="mt-2 text-sm leading-6 text-white/75">
                  Tell us what you need. We will help you find the right printing solution.
                </p>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -left-3 -z-10 h-20 w-20 rounded-full bg-[#D9AD32]/30 blur-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Service Introduction */}
      <section className="mx-auto w-full max-w-[1440px] px-3 pb-5 pt-12 sm:px-4 sm:pt-14 lg:px-5 lg:pb-8 lg:pt-8 xl:px-6">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionHeading
            eyebrow="Explore our services"
            title="Printing solutions for every idea"
            description="Whether you are promoting a business, preparing for an event, or creating something personal, find the printing service that fits your vision."
          />
        </motion.div>

        <div className="mt-7 flex flex-wrap gap-2">
          {[
            "Business Printing",
            "Banners & Flex",
            "Custom Apparel",
            "Personalised Gifts",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-[#E4DCCB] bg-white/60 px-4 py-2 text-xs font-semibold text-printora-charcoal transition duration-300 hover:border-[#D9AD32] hover:bg-[#F7E9BE]"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* Service Cards */}
      <section className="mx-auto w-full max-w-[1440px] space-y-7 px-3 py-8 sm:space-y-8 sm:px-4 sm:py-10 lg:space-y-9 lg:px-5 lg:py-6 xl:px-6">
        {items.map((item, index) => {
          const isDark = item.accent === "charcoal";

          return (
            <motion.article
              key={item.no}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative grid overflow-hidden rounded-[1.5rem] border shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl sm:rounded-[1.75rem] md:grid-cols-2 ${isDark
                  ? "border-[#38343A] bg-[#38343A] text-white"
                  : "border-[#E6DDCB] bg-[#F9F6EF] text-printora-charcoal"
                }`}
            >
              {/* Service Image */}
              <div
                className={`relative min-h-[260px] overflow-hidden sm:min-h-[320px] lg:min-h-[360px] ${index % 2 === 1 ? "md:order-2" : ""
                  }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                <div
                  className={`absolute inset-0 ${isDark
                      ? "bg-gradient-to-t from-[#201D22]/80 via-transparent to-black/5"
                      : "bg-gradient-to-t from-black/45 via-transparent to-black/5"
                    }`}
                />

                <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                  <span className="inline-flex rounded-full border border-white/30 bg-black/25 px-4 py-2 text-[10px] font-extrabold tracking-[0.18em] text-white backdrop-blur-md">
                    SERVICE {item.no}
                  </span>
                </div>

                <div className="absolute bottom-5 left-4 right-4 sm:bottom-7 sm:left-6 sm:right-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F5D36C]">
                    {item.category}
                  </p>

                  <h3 className="mt-2 max-w-md text-2xl font-black text-white sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Service Details */}
              <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-9 xl:p-11">
                <div className="mb-5 h-1 w-14 rounded-full bg-[#D9AD32]" />

                <p
                  className={`text-xs font-extrabold uppercase tracking-[0.17em] ${isDark ? "text-[#E8BD49]" : "text-[#967019]"
                    }`}
                >
                  {item.category}
                </p>

                <h2
                  className={`mt-3 text-2xl font-black leading-tight sm:text-3xl ${isDark ? "text-white" : "text-printora-charcoal"
                    }`}
                >
                  {item.title}
                </h2>

                <p
                  className={`mt-4 text-sm leading-7 ${isDark ? "text-white/65" : "text-printora-muted"
                    }`}
                >
                  {item.text}
                </p>

                <ul className="mt-5 space-y-3">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-sm leading-6"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D9AD32]/20 text-xs font-black text-[#A47B15]">
                        ✓
                      </span>

                      <span className={isDark ? "text-white/80" : "text-printora-charcoal"}>
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-7 border-t pt-5 ${isDark ? "border-white/10" : "border-[#E5DCCB]"
                    }`}
                >
                  <Link
                    to="/quote"
                    className={`inline-flex items-center gap-3 text-sm font-extrabold transition duration-300 ${isDark
                        ? "text-[#E8BD49] hover:text-white"
                        : "text-printora-charcoal hover:text-[#967019]"
                      }`}
                  >
                    Get a personalised quote

                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D9AD32] text-lg text-[#38343A] transition duration-300 group-hover:translate-x-1 group-hover:bg-[#E8BD49]">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* Why Choose Us */}
      <section className="w-full bg-[#E9E1D2] py-10 sm:py-14 lg:py-14">
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-4 lg:px-5 xl:px-6">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 xl:gap-16"
          >
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#967019]">
                The Printora difference
              </span>

              <h2 className="mt-4 max-w-lg text-3xl font-black leading-tight text-printora-charcoal sm:text-4xl lg:text-5xl">
                Good printing starts with understanding your needs.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-printora-muted sm:text-base">
                Every project is different. We help you choose suitable
                specifications and printing options so your final product
                matches your requirements.
              </p>

              <Link
                to="/about"
                className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-printora-charcoal transition hover:text-[#967019]"
              >
                Get to know Printora
                <span>→</span>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.number}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className={`rounded-2xl border border-[#D8CDB8] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 ${index === 2
                      ? "bg-[#D9AD32] sm:col-span-2"
                      : "bg-[#F8F5EF]"
                    }`}
                >
                  <span
                    className={`text-xs font-black tracking-[0.18em] ${index === 2 ? "text-[#38343A]/65" : "text-[#967019]"
                      }`}
                  >
                    {benefit.number}
                  </span>

                  <h3 className="mt-4 text-lg font-extrabold text-printora-charcoal">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-printora-charcoal/70">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="w-full bg-printora-warm px-3 py-10 sm:px-4 sm:py-14 lg:px-5 lg:py-16 xl:px-6">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[1.5rem] bg-[#D9AD32] px-5 py-8 sm:rounded-[2rem] sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:px-16"
        >
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-[#38343A]/[0.06]" />

          <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-white/20 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#38343A]/70">
                Have a custom project?
              </span>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#38343A] sm:text-4xl lg:text-5xl">
                Let's make something worth noticing.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#38343A]/75 sm:text-base">
                Tell us what you want to print, your preferred material,
                dimensions, quantity, and deadline. We'll help you explore
                the available options.
              </p>
            </div>

            <div className="shrink-0">
              <Button to="/quote">
                Request a Custom Quote
              </Button>

              <p className="mt-3 text-center text-xs font-semibold text-[#38343A]/65">
                Share your requirements to get started.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

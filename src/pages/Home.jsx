
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { ArrowRight } from "../components/Icons";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

// import homepageVideo from "../assets/homepage.mp4";

// --------------------------------------------------
// ANIMATION VARIANTS
// --------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// --------------------------------------------------
// SERVICES
// --------------------------------------------------

const services = [
  {
    number: "01",
    title: "Business Printing",
    description:
      "Make your brand unforgettable with professionally printed visiting cards, brochures, flyers, and stationery.",
    image:
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=900&q=85",
    tag: "For your business",
  },
  {
    number: "02",
    title: "Banners & Flex",
    description:
      "Bring your campaigns to life with bold banners, event backdrops, promotional displays, and large-format prints.",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=85",
    tag: "Make an impact",
  },
  {
    number: "03",
    title: "Custom Apparel",
    description:
      "Create personalized T-shirts for your team, celebrations, events, and promotional campaigns.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    tag: "Wear your ideas",
  },
  {
    number: "04",
    title: "Customized Gifts",
    description:
      "Turn everyday products into thoughtful keepsakes with personalized designs made especially for you.",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=85",
    tag: "Made personal",
  },
];

// --------------------------------------------------
// WHY CHOOSE US
// --------------------------------------------------

const benefits = [
  {
    number: "01",
    title: "Made for your brand",
    description:
      "Choose designs, colors, materials, and specifications that match your vision.",
  },
  {
    number: "02",
    title: "Quality you can see",
    description:
      "Thoughtfully selected printing materials and attention to every detail.",
  },
  {
    number: "03",
    title: "Simple ordering",
    description:
      "Share your requirements, receive a quotation, and follow your order's progress.",
  },
];

// --------------------------------------------------
// HOW IT WORKS
// --------------------------------------------------

const steps = [
  {
    number: "01",
    title: "Share your idea",
    description:
      "Choose a product, upload your design, and tell us your printing requirements.",
  },
  {
    number: "02",
    title: "Get your quotation",
    description:
      "Tell us the quantity, size, and material to help us prepare a suitable quote.",
  },
  {
    number: "03",
    title: "We bring it to life",
    description:
      "Follow your order status and get updates as your print order progresses.",
  },
];

// --------------------------------------------------
// HOME PAGE
// --------------------------------------------------

export default function Home() {
  const { products } = useStore();

  const featured = products
    .filter((product) => product.active)
    .slice(0, 3);

  return (
    <main className="overflow-hidden bg-white">
      {/* ================================================
          HERO SECTION
      ================================================= */}

      <section className="relative isolate overflow-hidden bg-[#211E20]">
        {/* Background Video */}
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        >
          <source src={homepageVideo} type="video/mp4" />
        </video> */}

        {/* Dark Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[#211E20]/25" />

        {/* Charcoal Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#211E20]/85 via-[#211E20]/55 to-[#211E20]/15" />

        {/* Bottom Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211E20]/40 via-transparent to-[#211E20]/10" />

        {/* Decorative Gold Glow */}
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#D9AD32]/15 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#D9AD32]/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-9 px-5 py-8 sm:gap-10 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-12 lg:py-12 xl:gap-16 xl:px-16">
          {/* Left: Hero Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-3 rounded-full border border-[#D9AD32]/40 bg-[#211E20]/45 px-4 py-2 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D9AD32] opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F2D786]" />
              </span>

              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F2D786] sm:text-xs">
                Print your imagination
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-black leading-[1.08] tracking-[-0.045em] text-white sm:mt-6 sm:text-5xl md:text-6xl xl:text-7xl"
            >
              Good ideas
              <br />

              deserve{" "}
              <span className="relative inline-block text-[#F2D786]">
                great prints.

                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.9,
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className="absolute -bottom-1 left-0 h-2 w-full origin-left rounded-full bg-[#D9AD32]/60 sm:h-3"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg"
            >
              From professional business stationery to eye-catching banners
              and personalized gifts, we turn your creative ideas into prints
              worth remembering.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Button to="/products">
                Explore Products
                <ArrowRight />
              </Button>

              <Button to="/quote" variant="outline">
                Request a Quote
              </Button>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div
              variants={fadeUp}
              className="mt-7 grid max-w-xl grid-cols-3 gap-3 border-t border-white/25 pt-5 sm:mt-8 sm:gap-7 sm:pt-6"
            >
              {[
                {
                  title: "Custom",
                  subtitle: "Your own design",
                },
                {
                  title: "Quality",
                  subtitle: "Careful printing",
                },
                {
                  title: "Local",
                  subtitle: "Tirunelveli team",
                },
              ].map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-extrabold text-white sm:text-lg">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-white/70 sm:text-xs">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Featured Image */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 -top-5 z-10 hidden h-20 w-20 rounded-full border border-[#D9AD32]/60 bg-[#D9AD32]/10 sm:block"
            />

            <div className="relative overflow-hidden rounded-[1.5rem] border-[5px] border-white/90 bg-[#211E20] shadow-[0_25px_80px_-25px_rgba(0,0,0,0.55)] sm:rounded-[2rem] sm:border-[8px]">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85"
                alt="Creative printing and promotional materials"
                loading="lazy"
                className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[400px] xl:h-[440px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#211E20]/80 via-[#211E20]/5 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2D786] sm:text-xs">
                  Printora Studio
                </p>

                <h2 className="mt-2 max-w-md text-xl font-extrabold leading-tight text-white sm:text-3xl">
                  Every detail makes a difference.
                </h2>

                <p className="mt-2 text-sm text-white/80">
                  From your imagination to the finished print.
                </p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 left-3 z-20 hidden max-w-xs rounded-2xl border border-white/15 bg-[#292521]/95 p-4 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-4 lg:-left-7"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D9AD32]/15 text-xl font-black text-[#F2D786]">
                P.
              </div>

              <div>
                <p className="text-sm font-extrabold text-white">
                  Your vision, printed.
                </p>

                <p className="mt-1 text-xs text-white/70">
                  Customized around your needs.
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-6 -right-3 hidden h-16 w-16 rounded-2xl border-2 border-[#D9AD32]/60 lg:block"
            />
          </motion.div>
        </div>
      </section>

      {/* ================================================
          INTRODUCTION STRIP
      ================================================= */}

      <section className="border-b border-[#EAE6DF] bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mx-auto grid max-w-[1600px] grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-3 sm:gap-6 sm:px-6 sm:py-6 lg:px-10 xl:px-14"
        >
          {[
            {
              number: "01",
              title: "Designed around you",
              text: "Printing solutions for your specific requirements.",
            },
            {
              number: "02",
              title: "Flexible customization",
              text: "Choose your preferred size, material, and quantity.",
            },
            {
              number: "03",
              title: "Order with confidence",
              text: "Request a quote and follow your order progress.",
            },
          ].map((item) => (
            <motion.div
              variants={fadeUp}
              key={item.number}
              className="flex items-start gap-4 sm:border-r sm:border-[#EAE6DF] sm:pr-5 last:border-0"
            >
              <span className="text-xs font-extrabold tracking-widest text-[#A77D13]">
                {item.number}
              </span>

              <div>
                <h3 className="text-sm font-extrabold text-[#38343A]">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#777178]">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================================================
          SERVICES SECTION
      ================================================= */}


      <section className="relative bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-14">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#A77D13]">
                What we do
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#38343A] sm:text-4xl lg:text-5xl">
                Ideas that look
                <span className="text-[#A77D13]"> better in print.</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#777178] sm:text-base">
                Whatever you want to create, discover printing solutions
                designed to make your message stand out.
              </p>
            </div>

            <Link
              to="/services"
              className="group inline-flex w-fit items-center gap-2 text-sm font-extrabold text-[#38343A] transition hover:text-[#A77D13]"
            >
              Explore all services
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowRight />
              </span>
            </Link>
          </motion.div>

          {/* Two columns on mobile; desktop layout preserved */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4"
          >
            {services.map((service) => (
              <motion.div
                variants={fadeUp}
                key={service.number}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group min-w-0"
              >
                <Link
                  to="/services"
                  className="block h-full overflow-hidden rounded-xl border border-[#EAE6DF] bg-white transition duration-300 hover:border-[#D9AD32] hover:shadow-[0_20px_50px_-25px_rgba(56,52,58,0.3)] sm:rounded-2xl"
                >
                  {/* Image */}
                  <div className="relative h-28 overflow-hidden bg-[#F5F3EF] sm:h-52">
                    <motion.img
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.5 }}
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />

                    <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full border border-white/40 bg-white/90 px-2 py-1 text-[8px] font-extrabold uppercase tracking-wide text-[#38343A] backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-wider">
                      {service.tag}
                    </span>

                    <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#38343A] shadow-md transition duration-300 group-hover:bg-[#D9AD32] sm:bottom-4 sm:right-4 sm:h-10 sm:w-10">
                      <ArrowRight />
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-3 sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#A77D13] sm:text-xs">
                        {service.number}
                      </span>

                      <span className="h-px w-5 bg-[#EAE6DF] transition-all duration-300 group-hover:w-16 group-hover:bg-[#D9AD32] sm:w-10" />
                    </div>

                    <h3 className="mt-2 text-sm font-extrabold leading-snug text-[#38343A] transition-colors group-hover:text-[#A77D13] sm:mt-3 sm:text-lg">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#777178] sm:text-sm sm:leading-7">
                      {service.description}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-extrabold text-[#38343A] sm:mt-4 sm:gap-2 sm:text-xs">
                      Discover more
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ================================================
          FEATURED PRODUCTS
      ================================================= */}

      <section className="relative overflow-hidden bg-[#F5F3EF] px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-14">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#D9AD32]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1600px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#A77D13]">
                Customer favourites
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#38343A] sm:text-4xl lg:text-5xl">
                Find your next favourite.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#777178] sm:text-base">
                Explore popular print products and personalize them with
                your preferred specifications.
              </p>
            </div>

            <Button to="/products" variant="outline">
              View all products
              <ArrowRight />
            </Button>
          </motion.div>

          {featured.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-7 grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3"
            >
              {featured.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="min-w-0"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-7 rounded-2xl border border-[#E5DFD3] bg-white p-7 text-center sm:p-10"
            >
              <h3 className="text-xl font-extrabold text-[#38343A]">
                New products are on the way.
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#777178]">
                Contact us to discuss your custom printing requirements.
              </p>

              <div className="mt-5 flex justify-center">
                <Button to="/quote">
                  Request a Quote
                  <ArrowRight />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================================================
          WHY PRINTORA
      ================================================= */}

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-14">
        <div className="mx-auto grid max-w-[1600px] items-center gap-9 lg:grid-cols-2 lg:gap-14">
          {/* Image Collage */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeLeft}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="overflow-hidden rounded-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=85"
                  alt="Printed stationery and notebooks"
                  loading="lazy"
                  className="h-48 w-full object-cover sm:h-60"
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="mt-8 overflow-hidden rounded-2xl sm:mt-12"
              >
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=85"
                  alt="Apparel for custom printing"
                  loading="lazy"
                  className="h-48 w-full object-cover sm:h-60"
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="-mt-5 overflow-hidden rounded-2xl sm:-mt-7"
              >
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=85"
                  alt="Creative design and printed products"
                  loading="lazy"
                  className="h-40 w-full object-cover sm:h-52"
                />
              </motion.div>

              <div className="flex items-center justify-center rounded-2xl bg-[#D9AD32] p-5 sm:p-7">
                <div>
                  <p className="text-4xl font-black tracking-tight text-[#38343A] sm:text-5xl">
                    Made
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#38343A] sm:text-3xl">
                    personal.
                  </p>

                  <p className="mt-3 text-xs font-semibold leading-5 text-[#38343A]/80 sm:text-sm">
                    Your ideas deserve their own identity.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#A77D13]">
              The Printora difference
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#38343A] sm:text-4xl lg:text-5xl">
              More than printing.
              <br />

              <span className="text-[#A77D13]">
                It's your identity.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#777178] sm:text-base">
              Every business has a story. Every event has a message.
              Every gift has a meaning. We help you express yours through
              thoughtfully customized print products.
            </p>

            <div className="mt-6 space-y-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  className="flex gap-4 border-b border-[#EAE6DF] pb-5 last:border-0"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F3EF] text-xs font-extrabold text-[#A77D13] transition-colors duration-300 hover:bg-[#D9AD32]">
                    {benefit.number}
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#38343A]">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-[#777178]">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <Button to="/about">
                More About Us
                <ArrowRight />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================
          HOW IT WORKS
      ================================================= */}


      <section className="bg-[#F5F3EF] px-3 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-14">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#A77D13] sm:text-xs sm:tracking-[0.2em]">
              Simple from start to finish
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#38343A] sm:text-4xl lg:text-5xl">
              Your idea to print,
              <br className="hidden sm:block" /> made simple.
            </h2>

            <p className="mt-3 text-xs leading-6 text-[#777178] sm:text-base sm:leading-7">
              Getting started with your next printing project takes just
              a few simple steps.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative mt-8 grid grid-cols-3 gap-2 sm:gap-5 md:gap-5"
          >
            {/* Connecting Line */}
            <div className="absolute left-[16%] right-[16%] top-5 hidden border-t border-dashed border-[#D9AD32] sm:top-7 md:block" />

            {steps.map((step) => (
              <motion.div
                variants={fadeUp}
                key={step.number}
                className="relative min-w-0 rounded-xl border border-[#E5DFD3] bg-white p-2.5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-25px_rgba(56,52,58,0.25)] sm:rounded-2xl sm:p-6 md:p-7"
              >
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8D7A5] bg-[#FBF8EF] text-xs font-black text-[#A77D13] transition-colors duration-300 hover:bg-[#D9AD32] hover:text-[#38343A] sm:h-14 sm:w-14 sm:rounded-2xl sm:text-lg">
                  {step.number}
                </div>

                <h3 className="mt-3 break-words text-sm font-extrabold leading-5 text-[#38343A] sm:mt-5 sm:text-xl sm:leading-normal">
                  {step.title}
                </h3>

                <p className="mt-2 break-words text-[11px] leading-5 text-[#777178] sm:mt-3 sm:text-sm sm:leading-7">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-7 flex justify-center"
          >
            <Button to="/quote">
              Start Your Project
              <ArrowRight />
            </Button>
          </motion.div>
        </div>
      </section>


      {/* ================================================
          FINAL CALL TO ACTION
      ================================================= */}

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-10 xl:px-14">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[1.5rem] bg-[#38343A] px-6 py-9 sm:rounded-[2rem] sm:px-10 sm:py-12 lg:px-16 lg:py-14"
        >
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              rotate: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border border-[#D9AD32]/30 sm:h-96 sm:w-96"
          />

          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#D9AD32]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#E5C45D]">
                Have a project in mind?
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Let's make something
                <span className="text-[#E5C45D]"> memorable.</span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Tell us what you want to print. Whether it's for your
                business, an event, or someone special, we'll help you
                find the right solution.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button to="/quote">
                Request a Quote
                <ArrowRight />
              </Button>

              <Link
                to="/track"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-bold text-white transition duration-300 hover:border-[#D9AD32] hover:bg-white/10"
              >
                Track Your Order
                <ArrowRight />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

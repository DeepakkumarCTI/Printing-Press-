
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";

export default function About() {
  const values = [
    {
      number: "01",
      title: "Clear Choices",
      description:
        "Simple product options and transparent specifications to make printing decisions easier.",
      accent: "bg-[#E7DDF8]",
      numberColor: "text-[#7250A1]",
      lineColor: "bg-[#8B69B8]",
    },
    {
      number: "02",
      title: "Made for Your Needs",
      description:
        "Printing solutions tailored to your ideas, business requirements, and personal occasions.",
      accent: "bg-[#DCECF7]",
      numberColor: "text-[#39799D]",
      lineColor: "bg-[#5799BC]",
    },
    {
      number: "03",
      title: "Helpful Communication",
      description:
        "A smooth ordering experience with clear communication from enquiry to delivery.",
      accent: "bg-[#F7E6BD]",
      numberColor: "text-[#967019]",
      lineColor: "bg-[#D9AD32]",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-[#F7F4EE]">
      {/* About Hero */}
      <section className="relative isolate overflow-hidden bg-[#38343A]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/printing-poster.jpg"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        >
          <source
            src="/videos/printing-background.mp4"
            type="video/mp4"
          />
          Your browser does not support background video.
        </video>

        <div className="absolute inset-0 -z-10 bg-[#211E25]/80" />

        {/* Decorative Colour Effects */}
        <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#D9AD32]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-64 w-64 rounded-full bg-[#8B69B8]/20 blur-3xl" />

        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-6 px-3 py-8 sm:gap-7 sm:px-4 sm:py-10 lg:grid-cols-2 lg:gap-10 lg:px-5 lg:py-12 xl:px-6">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8BD49]/30 bg-[#D9AD32]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8BD49] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#E8BD49]" />
              About Printora Studio
            </span>

            <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Good ideas deserve{" "}
              <span className="text-[#E8BD49]">great print.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Printora Studio is a printing press and custom merchandise
              business based in Palayamkottai, Tirunelveli. We help
              individuals, creators, and businesses turn their ideas into
              quality printed products.
            </p>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              From business stationery to banners, apparel, and personalised
              gifts, we focus on practical printing solutions and a smooth
              customer experience.
            </p>

            <Button to="/products" className="mt-5">
              Explore Our Products
            </Button>
          </div>

          {/* Right Content */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#51445C]/90 via-[#353139]/95 to-[#28272D]/95 p-5 shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-7 lg:p-8">
            <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#D9AD32]/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#8B69B8]/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-lg bg-[#D9AD32]/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8BD49]">
                What We Do
              </span>

              <h2 className="mt-4 text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                Turning your ideas into something tangible.
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/70">
                We bring products, custom designs, and printing services
                together to help customers create prints that suit their
                requirements.
              </p>

              <div className="mt-6 h-px bg-gradient-to-r from-[#D9AD32] via-[#8B69B8] to-transparent" />

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3.5">
                  <div className="mb-2 h-1 w-8 rounded-full bg-[#E8BD49]" />
                  <p className="text-sm font-bold text-white">
                    Custom Prints
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Made for your ideas
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3.5">
                  <div className="mb-2 h-1 w-8 rounded-full bg-[#A88BCB]" />
                  <p className="text-sm font-bold text-white">
                    Creative Solutions
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Options for every need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-gradient-to-b from-[#F0EAF8] to-[#F7F4EE]">
        <div className="mx-auto w-full max-w-[1600px] px-3 py-7 sm:px-4 sm:py-9 lg:px-5 lg:py-10 xl:px-6">
          <SectionHeading
            eyebrow="Our Purpose"
            title="What drives us forward"
            description="Our mission and vision guide the way we serve every customer."
          />

          <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
            {/* Mission */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#E2D7EF] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 lg:p-7">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#E7DDF8]/70 transition group-hover:h-32 group-hover:w-32" />

              <div className="relative">
                <span className="inline-flex rounded-lg bg-[#E7DDF8] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7250A1]">
                  Our Mission
                </span>

                <h3 className="mt-4 text-xl font-extrabold text-[#38343A] sm:text-2xl">
                  Making printing simple.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-[#716B75]">
                  To provide convenient, reliable, and customised printing
                  solutions that help individuals and businesses bring their
                  ideas to life.
                </p>

                <div className="mt-5 h-1 w-12 rounded-full bg-[#8B69B8]" />
              </div>
            </div>

            {/* Vision */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#D5E6EF] bg-[#EAF4FA] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 lg:p-7">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#D5EAF6]/80 transition group-hover:h-32 group-hover:w-32" />

              <div className="relative">
                <span className="inline-flex rounded-lg bg-[#D5EAF6] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#39799D]">
                  Our Vision
                </span>

                <h3 className="mt-4 text-xl font-extrabold text-[#38343A] sm:text-2xl">
                  Bringing every idea to life.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-[#647581]">
                  To become a trusted printing partner known for quality,
                  creativity, and a dependable customer experience.
                </p>

                <div className="mt-5 h-1 w-12 rounded-full bg-[#5799BC]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#F7F4EE]">
        <div className="mx-auto w-full max-w-[1600px] px-3 py-7 sm:px-4 sm:py-9 lg:px-5 lg:py-10 xl:px-6">
          <SectionHeading
            eyebrow="What Matters to Us"
            title="A thoughtful process from idea to print"
            description="We want ordering custom printing to feel straightforward, collaborative, and dependable."
          />

          <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.number}
                className="group rounded-2xl border border-[#E8E0D5] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D9AD32]/50 hover:shadow-lg sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-sm font-extrabold ${value.accent} ${value.numberColor}`}
                  >
                    {value.number}
                  </span>

                  <span
                    className={`h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16 ${value.lineColor}`}
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#38343A]">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#716B75]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-b from-[#F7F4EE] to-[#EDE4F4]">
        <div className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-4 sm:py-8 lg:px-5 lg:py-9 xl:px-6">
          <div className="relative isolate overflow-hidden rounded-2xl bg-[#38343A] px-5 py-7 text-center shadow-lg sm:px-8 sm:py-8 lg:px-10">
            <div className="absolute -right-12 -top-20 -z-10 h-56 w-56 rounded-full bg-[#D9AD32]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-12 -z-10 h-56 w-56 rounded-full bg-[#8B69B8]/25 blur-3xl" />

            <p className="inline-flex rounded-full border border-[#E8BD49]/25 bg-[#D9AD32]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8BD49] sm:text-xs">
              Let's Get Started
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
              Have an idea?{" "}
              <span className="text-[#E8BD49]">Let's bring it to print.</span>
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/70">
              Explore our products and find the right printing solution for
              your needs.
            </p>

            <Button to="/products" className="mt-5">
              Explore Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

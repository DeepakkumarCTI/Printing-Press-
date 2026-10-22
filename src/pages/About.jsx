import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";

export default function About() {
  const values = [
    {
      number: "01",
      title: "Clear Choices",
      description:
        "Simple product options and transparent specifications to make printing decisions easier.",
    },
    {
      number: "02",
      title: "Made for Your Needs",
      description:
        "Printing solutions tailored to your ideas, business requirements, and personal occasions.",
    },
    {
      number: "03",
      title: "Helpful Communication",
      description:
        "A smooth ordering experience with clear communication from enquiry to delivery.",
    },
  ];

  return (
    <div className="bg-white">
      {/* About Hero */}
      <section className="relative isolate overflow-hidden bg-[#38343A]">
  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    poster="/videos/printing-poster.jpg"
    className="absolute inset-0 -z-20 h-full w-full object-cover"
  >
    <source src="/videos/printing-background.mp4" type="video/mp4" />
    Your browser does not support background video.
  </video>

  {/* Dark Overlay */}
  <div className="absolute inset-0 -z-10 bg-[#201D22]/75" />

  {/* Content */}
  <div className="mx-auto grid max-w-7xl items-center gap-7 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-16">
    {/* Left Content */}
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8BD49] sm:text-xs sm:tracking-[0.2em]">
        About Printora Studio
      </p>

      <h1 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
        Good ideas deserve great print.
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:mt-5 sm:text-base sm:leading-8">
        Printora Studio is a printing press and custom merchandise
        business based in Palayamkottai, Tirunelveli. We help
        individuals, creators, and businesses turn their ideas into
        quality printed products.
      </p>

      <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:mt-4 sm:text-base sm:leading-8">
        From business stationery to banners, apparel, and personalised
        gifts, we focus on practical printing solutions and a smooth
        customer experience.
      </p>

      <Button to="/products" className="mt-5 sm:mt-6">
        Explore Our Products
      </Button>
    </div>

    {/* Right Content */}
    <div className="rounded-2xl border border-white/20 bg-black/20 p-5 backdrop-blur-sm sm:rounded-3xl sm:p-7 lg:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8BD49] sm:text-xs sm:tracking-[0.2em]">
        What We Do
      </p>

      <h2 className="mt-3 text-xl font-extrabold leading-snug text-white sm:mt-4 sm:text-2xl lg:text-3xl">
        Turning your ideas into something tangible.
      </h2>

      <p className="mt-3 text-sm leading-6 text-white/75 sm:mt-4 sm:leading-7">
        We bring products, custom designs, and printing services
        together to help customers create prints that suit their
        requirements.
      </p>

      <div className="mt-5 h-1 w-14 rounded-full bg-[#D9AD32] sm:mt-6 sm:w-16" />
    </div>
  </div>
</section>

      {/* Mission and Vision */}
      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-12">
        <SectionHeading
          eyebrow="Our Purpose"
          title="What drives us forward"
          description="Our mission and vision guide the way we serve every customer."
        />

        <div className="mt-6 grid gap-4 sm:mt-7 md:grid-cols-2 md:gap-5">
          <div className="rounded-xl border border-printora-line bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:rounded-2xl sm:p-6 lg:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#967019] sm:text-xs sm:tracking-[0.2em]">
              Our Mission
            </p>

            <h3 className="mt-3 text-xl font-extrabold text-printora-charcoal sm:text-2xl">
              Making printing simple.
            </h3>

            <p className="mt-3 text-sm leading-6 text-printora-muted sm:leading-7">
              To provide convenient, reliable, and customised printing
              solutions that help individuals and businesses bring their
              ideas to life.
            </p>
          </div>

          <div className="rounded-xl border border-printora-line bg-printora-warm p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:rounded-2xl sm:p-6 lg:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#967019] sm:text-xs sm:tracking-[0.2em]">
              Our Vision
            </p>

            <h3 className="mt-3 text-xl font-extrabold text-printora-charcoal sm:text-2xl">
              Bringing every idea to life.
            </h3>

            <p className="mt-3 text-sm leading-6 text-printora-muted sm:leading-7">
              To become a trusted printing partner known for quality,
              creativity, and a dependable customer experience.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-printora-warm">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-12">
          <SectionHeading
            eyebrow="What Matters to Us"
            title="A thoughtful process from idea to print"
            description="We want ordering custom printing to feel straightforward, collaborative, and dependable."
          />

          <div className="mt-6 grid gap-4 sm:mt-7 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.number}
                className="rounded-xl border border-printora-line bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:rounded-2xl sm:p-6"
              >
                <p className="text-xs font-extrabold tracking-widest text-[#967019]">
                  {value.number}
                </p>

                <h3 className="mt-3 text-base font-bold text-printora-charcoal sm:text-lg">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-printora-muted sm:leading-7">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-12">
        <div className="rounded-xl bg-[#38343A] px-5 py-7 text-center sm:rounded-2xl sm:px-8 sm:py-9 lg:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8BD49] sm:text-xs sm:tracking-[0.2em]">
            Let's Get Started
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
            Have an idea? Let's bring it to print.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/65 sm:leading-7">
            Explore our products and find the right printing solution for
            your needs.
          </p>

          <Button to="/products" className="mt-5">
            Explore Products
          </Button>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

import instagram from "../assets/images/insta.png";
import facebook from "../assets/images/facebook.png";
import youtube from "../assets/images/youtube.png";
import whatsappIcon from "../assets/images/whatsapp.png";

const socialLinks = [
  {
    name: "Instagram",
    image: instagram,
    url: "https://www.instagram.com/",
  },
  {
    name: "Facebook",
    image: facebook,
    url: "https://www.facebook.com/",
  },
  {
    name: "YouTube",
    image: youtube,
    url: "https://www.youtube.com/",
  },
  {
    name: "WhatsApp",
    image: whatsappIcon,
    url: "https://wa.me/919876543210",
  },
];

const exploreLinks = [
  { label: "Our Services", to: "/services" },
  { label: "Product Catalog", to: "/products" },
  { label: "Request a Quote", to: "/quote" },
  { label: "Track an Order", to: "/track" },
];

const benefits = [
  {
    number: "01",
    title: "Quality Printing",
    description: "Carefully finished print products.",
  },
  {
    number: "02",
    title: "Custom Solutions",
    description: "Printing tailored to your needs.",
  },
  {
    number: "03",
    title: "Personal Support",
    description: "Help from enquiry to delivery.",
  },
];

const legalContent = {
  privacy: {
    label: "Privacy Policy",
    title: "Your privacy matters.",
    intro:
      "Printora Studio respects your privacy. This policy explains how personal information may be handled when you use our website or contact us.",
    sections: [
      {
        heading: "Information we collect",
        text:
          "When you submit an enquiry or request a quotation, you may provide your name, email address, phone number, delivery details, and printing requirements.",
      },
      {
        heading: "How information is used",
        text:
          "Information you provide may be used to respond to enquiries, prepare quotations, process orders, coordinate delivery, and provide customer support.",
      },
      {
        heading: "Designs and uploaded files",
        text:
          "Artwork and design files you submit may be used to fulfil your printing request. Avoid uploading confidential information that is not needed for your order.",
      },
      {
        heading: "Sharing and security",
        text:
          "Customer information should only be shared when necessary to provide requested services or comply with applicable law. Reasonable safeguards should be used to protect personal information.",
      },
      {
        heading: "Your choices and contact",
        text:
          "For questions about your information, contact printorastudio@example.com. Requests will be handled in accordance with applicable law.",
      },
    ],
  },

  terms: {
    label: "Terms & Conditions",
    title: "A clear way to work together.",
    intro:
      "These terms describe the general conditions for using the Printora Studio website and enquiring about our printing services.",
    sections: [
      {
        heading: "Product specifications",
        text:
          "Customers should review product dimensions, materials, quantities, colours, and other specifications before confirming an order. Final print results may vary depending on the artwork, material, and printing process.",
      },
      {
        heading: "Artwork and customer responsibility",
        text:
          "Customers are responsible for ensuring they have permission to use submitted artwork, photographs, logos, fonts, and other content. Please check proofs and supplied details before approving production.",
      },
      {
        heading: "Quotes and pricing",
        text:
          "Quotations may depend on product specifications, quantity, materials, finishing, delivery, and production requirements. Final pricing is subject to the terms confirmed by Printora Studio.",
      },
      {
        heading: "Orders and delivery",
        text:
          "Production and delivery timelines should be confirmed when an order is accepted. Timelines may be affected by artwork approval, material availability, or circumstances outside our reasonable control.",
      },
      {
        heading: "Changes and cancellations",
        text:
          "Submit changes or cancellation requests as early as possible. Whether a request can be accepted may depend on the order's production status and the agreed order terms.",
      },
      {
        heading: "Contact",
        text:
          "For questions about an order or these terms, contact printorastudio@example.com or call +91 98765 43210.",
      },
    ],
  },
};

function LegalModal({ type, onClose }) {
  const content = legalContent[type];

  useEffect(() => {
    if (!content) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [content, onClose]);

  if (!content) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#201D22]/75 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#E5DCCB] bg-[#F9F6EF] shadow-2xl sm:rounded-3xl"
      >
        <div className="relative shrink-0 overflow-hidden bg-[#38343A] px-5 py-5 text-white sm:px-7 sm:py-6">
          <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-[#D9AD32]/15 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8BD49] sm:text-xs">
                Printora Studio
              </p>

              <h2
                id="legal-modal-title"
                className="mt-2 text-xl font-black sm:text-2xl"
              >
                {content.label}
              </h2>

              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                {content.title}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-xl text-white/80 transition hover:border-[#D9AD32] hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <p className="text-sm leading-7 text-printora-muted">
            {content.intro}
          </p>

          <div className="mt-5 space-y-5">
            {content.sections.map((section, index) => (
              <section
                key={section.heading}
                className="border-b border-[#E5DCCB] pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#D9AD32]/20 text-[10px] font-black text-[#967019]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-sm font-extrabold text-printora-charcoal">
                      {section.heading}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-printora-muted">
                      {section.text}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-[#E5DCCB] bg-white/60 p-4">
            <p className="text-xs leading-6 text-printora-muted">
              Questions? Contact us at{" "}
              <a
                href="mailto:printorastudio@example.com"
                className="font-bold text-[#967019] hover:underline"
              >
                printorastudio@example.com
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex shrink-0 justify-end border-t border-[#E5DCCB] bg-white/50 px-5 py-3 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#38343A] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#504A52]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  const whatsapp =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent(
      "Hello Printora Studio, I would like to enquire about your printing services."
    );

  return (
    <>
      <footer className="w-full bg-[#38343A] text-white">
        {/* Main Footer Content */}
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-x-8 gap-y-5 px-3 py-6 sm:grid-cols-2 sm:px-4 sm:py-7 lg:grid-cols-[1.35fr_0.75fr_0.85fr_1.05fr] lg:gap-x-7 lg:px-5 lg:py-7 xl:px-6">
          {/* Brand */}
          <div>
            <Link
              to="/"
              aria-label="Printora Studio home"
              className="inline-flex items-center gap-3"
            >
              <img
                src={logo}
                alt="Printora Studio logo"
                className="h-12 w-12 shrink-0 object-cover"
              />

              <span className="text-lg font-extrabold tracking-tight sm:text-xl">
                Printora Studio
              </span>
            </Link>

            <p className="mt-2.5 max-w-sm text-sm leading-6 text-white/65">
              Thoughtful printing and custom merchandise for businesses,
              events, and special moments.
            </p>

            <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#D9AD32] px-3.5 py-2.5 text-xs font-extrabold text-[#38343A] transition hover:bg-[#E8BD49] sm:text-sm"
              >
                Contact Us <span className="ml-2">→</span>
              </a>

              <div className="flex items-center gap-1.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit Printora Studio on ${social.name}`}
                    title={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] transition hover:-translate-y-0.5 hover:border-[#D9AD32]/60 hover:bg-white/10"
                  >
                    <img
                      src={social.image}
                      alt=""
                      loading="lazy"
                      className="h-7 w-7 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:pl-2">
            <h3 className="text-sm font-extrabold tracking-wide">
              Explore
            </h3>

            <div className="mt-3 space-y-2.5 text-sm text-white/65">
              {exploreLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block w-fit transition hover:translate-x-0.5 hover:text-[#E8BD49]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Why Printora */}
          <div>
            <h3 className="text-sm font-extrabold tracking-wide">
              Why Printora?
            </h3>

            <div className="mt-3 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit.number} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#D9AD32]/25 bg-[#D9AD32]/10 text-[10px] font-extrabold text-[#E8BD49]">
                    {benefit.number}
                  </span>

                  <div>
                    <p className="text-xs font-bold text-white/90 sm:text-sm">
                      {benefit.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-white/50">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-extrabold tracking-wide">
              Contact Us
            </h3>

            <div className="mt-3 space-y-2.5 text-sm leading-6 text-white/65">
              <p>
                24, Main Road, Palayamkottai,
                <br />
                Tirunelveli, Tamil Nadu – 627002, India
              </p>

              <a
                href="tel:+919876543210"
                className="block w-fit transition hover:text-[#E8BD49]"
              >
                +91 98765 43210
              </a>

              <a
                href="mailto:printorastudio@example.com"
                className="block break-all transition hover:text-[#E8BD49]"
              >
                printorastudio@example.com
              </a>

              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 pt-0.5 text-xs font-bold text-[#E8BD49] transition hover:text-white"
              >
                <img
                  src={whatsappIcon}
                  alt=""
                  className="h-5 w-5 object-contain"
                />
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-2 px-3 py-3 text-center sm:flex-row sm:px-4 sm:text-left lg:px-5 xl:px-6">
            <p className="text-[11px] leading-5 text-white/45 sm:text-xs">
              © {new Date().getFullYear()} Printora Studio. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium text-white/60 sm:text-xs">
              <button
                type="button"
                onClick={() => setActiveModal("privacy")}
                className="transition hover:text-[#E8BD49]"
              >
                Privacy Policy
              </button>

              <span className="h-3 w-px bg-white/20" />

              <button
                type="button"
                onClick={() => setActiveModal("terms")}
                className="transition hover:text-[#E8BD49]"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      {activeModal && (
        <LegalModal
          type={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}


import { Link, NavLink } from "react-router-dom";
import { ShieldUser } from "./Icons";
import Button from "./Button";
import logo from "../assets/logo.png";

const links = [
  { label: "Home", path: "/", icon: "home" },
  { label: "Services", path: "/services", icon: "services" },
  { label: "Products", path: "/products", icon: "products" },
  { label: "Track Order", path: "/track", icon: "track" },
  { label: "About", path: "/about", icon: "about" },
];

function NavIcon({ name, size = 21 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9M9 20v-7h6v7" />
        </svg>
      );

    case "services":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M8 4V2.5h8V4M3 10h18M10 10v3h4v-3" />
        </svg>
      );

    case "products":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </svg>
      );

    case "track":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" />
          <path d="m14 10 5-5" />
        </svg>
      );

    case "about":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Navbar() {
  const navClass = ({ isActive }) =>
    `relative flex items-center gap-2 rounded-xl px-3 py-2.5
    text-sm font-semibold transition-all duration-300 ${isActive
      ? "bg-[#fbf5e7] text-[#9a7417]"
      : "text-printora-charcoal hover:bg-printora-warm hover:text-[#9a7417]"
    }`;

  return (
    <>
      {/* Animated Desktop and Mobile Header */}
      <header className="printora-animated-header sticky top-0 z-40 border-b border-printora-line bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5"
          >
            <img
              src={logo}
              alt="Printora Studio Logo"
              className="h-10 w-10 shrink-0 rounded-xl object-contain sm:h-12 sm:w-12"
            />

            <span className="min-w-0">
              <span className="block whitespace-nowrap text-base font-extrabold leading-5 tracking-tight text-printora-charcoal sm:text-lg">
                Printora Studio
              </span>

              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-printora-muted sm:block sm:text-[10px]">
                Print · Create · Customize
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex xl:gap-2"
          >
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={navClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              to="/login"
              aria-label="Admin Login"
              title="Admin Login"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-printora-charcoal transition duration-300 hover:bg-printora-warm hover:text-[#9a7417]"
            >
              <ShieldUser size={21} strokeWidth={1.8} />
            </Link>

            <Button to="/quote" className="px-4 py-2.5">
              Request a Quote
            </Button>
          </div>

          {/* Mobile Header */}
          <div className="shrink-0 lg:hidden">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center rounded-xl bg-[#f7edcf] px-3 py-2.5 text-xs font-bold text-[#78590d] transition duration-300 hover:bg-[#efdfae] sm:px-4 sm:text-sm"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Animated Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile navigation"
        className="printora-animated-bottom fixed inset-x-0 bottom-0 z-50 border-t border-[#e9e2d4] bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_25px_rgba(30,25,10,0.07)] backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto grid max-w-xl grid-cols-5">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group relative flex min-w-0 flex-col items-center justify-center gap-1 px-0.5 pb-2 pt-2.5 transition-all duration-300 ${isActive
                  ? "text-[#9a7417]"
                  : "text-[#8b8b8b] hover:text-[#9a7417]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-8 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${isActive
                        ? "bg-[#f7edcf] shadow-sm"
                        : "bg-transparent group-hover:bg-printora-warm"
                      }`}
                  >
                    <NavIcon name={item.icon} size={21} />
                  </span>

                  <span
                    className={`max-w-full truncate text-[10px] transition-all duration-300 sm:text-[11px] ${isActive ? "font-bold" : "font-medium"
                      }`}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="printora-active-indicator absolute bottom-0 h-[3px] w-8 rounded-t-full bg-[#b28a27]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

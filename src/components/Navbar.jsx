import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuIcon, CloseIcon, ShieldUser } from "./Icons";
import Button from "./Button";

import logo from "../assets/logo.png";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Products", "/products"],
  ["About Us", "/about"],
  ["Track Order", "/track"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive
        ? "text-[#9a7417]"
        : "text-printora-charcoal hover:text-[#9a7417]"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-printora-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-3 py-3 sm:px-4 lg:px-6 xl:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Printora Studio Logo"
            className="h-11 w-11 shrink-0 rounded-lg object-contain"
          />

          <span>
            <span className="block text-lg font-extrabold leading-5 tracking-tight text-printora-charcoal">
              Printora Studio
            </span>

            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-printora-muted">
              Print · Create · Customize
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} className={navClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link
            to="/login"
            className="flex items-center justify-center rounded-lg p-2 text-printora-charcoal transition hover:bg-printora-warm hover:text-[#9a7417]"
            aria-label="Admin Login"
            title="Admin Login"
          >
            <ShieldUser size={22} strokeWidth={1.8} />
          </Link>

          <Button to="/quote" className="px-4 py-2.5">
            Request a Quote
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-printora-charcoal transition hover:bg-printora-warm lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-printora-line bg-white px-3 py-4 shadow-soft sm:px-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-printora-pale text-[#9a7417]"
                      : "text-printora-charcoal hover:bg-printora-warm"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-printora-mustard px-4 py-3 text-center text-sm font-bold text-printora-charcoal"
            >
              Request a Quote
            </Link>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-printora-charcoal hover:bg-printora-warm"
            >
              <ShieldUser size={22} />
              Admin Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
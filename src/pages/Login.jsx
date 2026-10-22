
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import FormField, { inputClass } from "../components/FormField";
import Button from "../components/Button";
import logo from "../assets/logo.png";

function BrandLogo({ size = "h-12 w-12" }) {
  return (
    <img
      src={logo}
      alt="Printora Studio logo"
      className={`${ size } shrink - 0 rounded - xl object - contain`}
    />
  );
}

function BackToWebsite() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 rounded-xl border border-printora-line bg-white px-4 py-2.5 text-sm font-bold text-printora-charcoal shadow-sm transition hover:border-printora-mustard hover:bg-printora-warm"
    >
      <span aria-hidden="true">←</span>
      Back to Website
    </Link>
  );
}

export default function Login() {
  const { setAdmin, admin } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (admin) {
      navigate("/admin", { replace: true });
    }
  }, [admin, navigate]);

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (
      email.trim().toLowerCase() === "admin@gmail.com" &&
      password === "admin123"
    ) {
      setAdmin(true);
      navigate("/admin", { replace: true });
    } else {
      setError(
        "Incorrect email or password. Please check your demo credentials."
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-printora-warm px-4 py-8 sm:py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-printora-line bg-white shadow-soft md:min-h-[600px] md:grid-cols-[0.95fr_1.05fr]">
        {/* Desktop branding panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-printora-charcoal p-8 text-white sm:p-10 md:flex">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/[0.04]" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[30px] border-printora-mustard/10" />

          <Link to="/" className="relative z-10 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm">
              <BrandLogo size="h-full w-full" />
            </div>

            <div>
              <span className="block text-xl font-extrabold tracking-tight">
                Printora Studio
              </span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Print · Create · Customize
              </span>
            </div>
          </Link>

          <div className="relative z-10 py-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-printora-mustard">
              <span className="h-1.5 w-1.5 rounded-full bg-printora-mustard" />
              Admin workspace
            </span>

            <h1 className="mt-6 max-w-md text-4xl font-extrabold leading-[1.15] tracking-tight lg:text-5xl">
              Every print request, in one place.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Manage printing orders, review customer enquiries, and keep your
              product catalog up to date from one simple dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-white/75">
                Order management
              </span>
              <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-white/75">
                Quote requests
              </span>
              <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-white/75">
                Product catalog
              </span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-xs text-white/45">
              Printora Studio · Tirunelveli
            </p>
            <span className="text-xs font-semibold text-printora-mustard">
              Admin portal
            </span>
          </div>
        </aside>

        {/* Login form */}
        <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          {/* Back button */}
          <div className="mb-8 flex justify-start">
            <BackToWebsite />
          </div>

          {/* Mobile branding */}
          <Link to="/" className="mb-8 flex items-center gap-3 md:hidden">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-printora-line bg-white p-1">
              <BrandLogo size="h-full w-full" />
            </div>

            <div>
              <span className="block text-lg font-extrabold text-printora-charcoal">
                Printora Studio
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-printora-muted">
                Admin portal
              </span>
            </div>
          </Link>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#967019]">
              Welcome back
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-printora-charcoal sm:text-4xl">
              Admin sign in
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-printora-muted">
              Sign in to manage your printing orders, customer quote requests,
              and products.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <FormField label="Email address" required>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="admin@gmail.com"
                autoComplete="username"
                required
              />
            </FormField>

            <FormField label="Password" required>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </FormField>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-700"
              >
                {error}
              </p>
            )}

            <Button type="submit" className="w-full">
              Sign in to dashboard
            </Button>
          </form>

          <div className="mt-8 border-t border-printora-line pt-5">
            <p className="text-center text-xs leading-5 text-printora-muted">
              Authorized administrators only.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

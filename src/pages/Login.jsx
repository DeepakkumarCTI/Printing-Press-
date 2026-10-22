import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { BrandMark } from "../components/Icons";
import FormField, { inputClass } from "../components/FormField";
import Button from "../components/Button";

export default function Login() {
  const { setAdmin, admin } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  if (admin) navigate("/admin", { replace: true });
  const submit = (e) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === "admin@gmail.com" && password === "admin123") {
      setAdmin(true);
      navigate("/admin", { replace: true });
    } else setError("Incorrect email or password. Please try the demo credentials.");
  };
  return <div className="flex min-h-screen items-center justify-center bg-printora-warm px-4 py-10">
    <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-printora-line bg-white shadow-soft md:grid-cols-[.9fr_1.1fr]">
      <div className="hidden flex-col justify-between bg-printora-charcoal p-10 text-white md:flex"><Link to="/" className="flex items-center gap-3"><BrandMark/><span className="text-xl font-extrabold">Printora Studio</span></Link><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-printora-mustard">Admin workspace</p><h1 className="mt-4 text-4xl font-extrabold leading-tight">Every print request, in one place.</h1><p className="mt-5 leading-7 text-white/65">Manage orders, review quote requests, and keep product details up to date.</p></div><p className="text-xs text-white/45">Printora Studio · Tirunelveli</p></div>
      <div className="p-6 sm:p-10 lg:p-14"><Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-printora-muted hover:text-printora-charcoal md:hidden"><span>←</span> Back to website</Link><div className="mt-5 md:mt-0"><div className="flex items-center gap-3 md:hidden"><BrandMark/><span className="text-lg font-extrabold">Printora Studio</span></div><p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#967019]">Welcome back</p><h2 className="mt-3 text-3xl font-extrabold text-printora-charcoal">Admin sign in</h2><p className="mt-3 text-sm leading-6 text-printora-muted">Sign in to manage your printing orders and customer requests.</p></div>
        <form onSubmit={submit} className="mt-8 space-y-5"><FormField label="Email address" required><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className={inputClass} placeholder="admin@gmail.com" required autoComplete="username"/></FormField><FormField label="Password" required><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className={inputClass} placeholder="Enter password" required autoComplete="current-password"/></FormField>{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<Button type="submit" className="w-full">Sign in to dashboard</Button></form>
        <div className="mt-6 rounded-xl bg-printora-pale p-4"><p className="text-xs font-bold text-printora-charcoal">Demo credentials</p><p className="mt-2 text-xs text-printora-muted">Email: admin@gmail.com</p><p className="mt-1 text-xs text-printora-muted">Password: admin123</p></div><Link to="/" className="mt-6 hidden text-sm font-semibold text-printora-muted hover:text-printora-charcoal md:inline-block">← Back to website</Link><p className="mt-6 text-center text-[11px] leading-5 text-printora-muted">Frontend demo login only. Use secure server-side authentication before production.</p>
      </div>
    </div>
  </div>;
}

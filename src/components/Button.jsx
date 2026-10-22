import { Link } from "react-router-dom";

const styles = {
  primary: "bg-printora-mustard text-printora-charcoal hover:bg-[#c89b22] shadow-sm",
  dark: "bg-printora-charcoal text-white hover:bg-[#242126]",
  outline: "border border-printora-line bg-white text-printora-charcoal hover:border-printora-mustard hover:bg-printora-pale",
  light: "bg-printora-warm text-printora-charcoal hover:bg-[#ebe7df]"
};

export default function Button({ children, to, href, onClick, variant = "primary", className = "", type = "button", disabled = false }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-printora-mustard focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant] || styles.primary} ${className}`;
  if (to) return <Link to={to} className={classes}>{children}</Link>;
  if (href) return <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{children}</a>;
  return <button type={type} onClick={onClick} disabled={disabled} className={classes}>{children}</button>;
}

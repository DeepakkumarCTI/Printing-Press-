export default function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#9a7417]">{eyebrow}</p>}
      <h2 className="text-3xl font-bold tracking-tight text-printora-charcoal sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-printora-muted">{description}</p>}
    </div>
  );
}

export const inputClass = "mt-2 w-full rounded-xl border border-printora-line bg-white px-4 py-3 text-sm text-printora-charcoal outline-none transition placeholder:text-[#aaa39d] focus:border-printora-mustard focus:ring-2 focus:ring-[#d9ad32]/20";
export default function FormField({ label, required = false, hint, children }) {
  return <label className="block text-sm font-semibold text-printora-charcoal">{label}{required && <span className="ml-1 text-[#9a7417]">*</span>}{children}{hint && <span className="mt-1 block text-xs font-normal text-printora-muted">{hint}</span>}</label>;
}

export default function WhatsAppButton() {
  const url = "https://wa.me/919876543210?text=" + encodeURIComponent("Hello Printora Studio, I would like to know more about your printing services.");
  return <a href={url} target="_blank" rel="noreferrer" aria-label="Chat with Printora Studio on WhatsApp" className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/70 bg-[#38343A] px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#242126]"><span className="inline-block h-2.5 w-2.5 rounded-full bg-printora-mustard" />WhatsApp us</a>;
}

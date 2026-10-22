const styles = {
  Received: "bg-[#f8edca] text-[#76570a]",
  "In Progress": "bg-[#e9e3d8] text-[#5f5344]",
  "Ready for Dispatch": "bg-[#eee2c4] text-[#6c5214]",
  Dispatched: "bg-[#e7e4e1] text-[#4e4946]",
  Delivered: "bg-[#e5e2dc] text-[#38343a]",
  Cancelled: "bg-[#f7e4e1] text-[#8d4035]",
  New: "bg-[#f8edca] text-[#76570a]",
  Contacted: "bg-[#e9e3d8] text-[#5f5344]",
  Quoted: "bg-[#eee2c4] text-[#6c5214]"
};
export default function StatusBadge({ status }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles[status] || "bg-printora-warm text-printora-charcoal"}`}>{status}</span>;
}

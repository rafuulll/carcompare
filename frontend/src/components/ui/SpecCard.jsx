export function SpecCard({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center text-center bg-surface-container rounded-xl p-4 gap-1">
      <span className="material-symbols-outlined text-surface-tint" style={{fontSize:22}}>{icon}</span>
      <span className="text-[9px] font-bold tracking-widest uppercase text-outline">{label}</span>
      <span className="text-[15px] font-bold text-on-surface">{value}</span>
    </div>
  )
}

export function Input({ label, icon, placeholder, value, onChange, type = 'text', className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant ml-1">{label}</label>}
      <div className="relative">
        {icon && <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" style={{fontSize:18}}>{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-surface-low border border-transparent rounded-lg py-2.5 text-sm text-on-surface outline-none transition focus:border-primary-container focus:ring-2 focus:ring-primary-container/10 ${icon ? 'pl-10 pr-3' : 'px-3'}`}
        />
      </div>
    </div>
  )
}

export function Select({ label, options = [], value, onChange, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant ml-1">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-surface-low border border-transparent rounded-lg py-2.5 px-3 text-sm text-on-surface outline-none transition focus:border-primary-container cursor-pointer appearance-none"
        style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2377767e' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",backgroundRepeat:'no-repeat',backgroundPosition:'right 14px center',paddingRight:36}}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

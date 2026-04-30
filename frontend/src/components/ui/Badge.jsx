const variants = {
  default:  'bg-surface-container text-on-surface-variant',
  primary:  'bg-primary-container text-white',
  success:  'bg-green-100 text-green-800',
  warning:  'bg-yellow-100 text-yellow-800',
  electric: 'bg-blue-100 text-blue-800',
}

export function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

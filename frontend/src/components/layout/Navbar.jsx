import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const links = [
  { label: 'Início',    path: '/' },
  { label: 'Catálogo',  path: '/catalogo' },
  { label: 'Comparar',  path: '/comparar' },
  { label: 'Marcas',    path: '/catalogo' },
]

export function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/catalogo?q=${searchValue.trim()}`)
      setSearchOpen(false)
      setSearchValue('')
    }
  }

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 w-full h-[70px] z-50 border-b border-slate-200 shadow-nav">
        <div className="max-w-app mx-auto px-6 flex items-center justify-between w-full h-full">

          {/* Logo */}
          <button onClick={() => { navigate('/'); setMenuOpen(false) }} className="text-2xl font-black tracking-tighter text-slate-950 active:scale-95 transition-transform select-none">
            CAR<span className="text-primary-container">COMPARE</span>
          </button>

          {/* Links — desktop */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`text-sm font-semibold tracking-wide transition-colors pb-0.5 ${
                  pathname === link.path
                    ? 'text-on-surface border-b-2 border-on-surface'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Ações — desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search inline */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Buscar carro..."
                  className="bg-surface-low border border-outline-variant rounded-lg px-3 py-1.5 text-sm text-on-surface outline-none focus:border-primary-container w-48 transition-all"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant">close</span>
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
            )}
            <button onClick={() => navigate('/comparar')} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-on-surface-variant hover:text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
              <span className="text-sm font-semibold tracking-wide hidden lg:block">Comparar</span>
            </button>
            <button onClick={() => navigate('/catalogo')} className="ml-2 px-5 py-2 bg-slate-950 text-white text-sm font-semibold tracking-wide rounded-lg hover:bg-slate-700 transition-colors active:scale-95">
              Ver Catálogo
            </button>
          </div>

          {/* Mobile — ações */}
          <div className="flex md:hidden items-center gap-1">
            <button onClick={() => { setSearchOpen(v => !v); setMenuOpen(false) }} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined text-[22px]">{searchOpen ? 'close' : 'search'}</span>
            </button>
            <button onClick={() => { setMenuOpen(v => !v); setSearchOpen(false) }} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined text-[22px]">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>

        </div>

        {/* Search bar mobile */}
        {searchOpen && (
          <div className="md:hidden px-6 pb-3 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                autoFocus
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Buscar marca ou modelo..."
                className="flex-1 bg-surface-low border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface outline-none focus:border-primary-container"
              />
              <button type="submit" className="bg-primary-container text-white px-4 rounded-lg text-sm font-semibold">
                Buscar
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Menu mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden fixed top-[70px] left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-float flex flex-col py-4">
          {links.map(link => (
            <button
              key={link.label}
              onClick={() => { navigate(link.path); setMenuOpen(false) }}
              className={`px-6 py-3 text-left text-sm font-semibold transition-colors ${
                pathname === link.path ? 'text-on-surface bg-surface-low' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-low'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="px-6 pt-3 border-t border-outline-variant mt-2">
            <button onClick={() => { navigate('/catalogo'); setMenuOpen(false) }} className="w-full bg-slate-950 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-slate-700 transition-colors">
              Ver Catálogo
            </button>
          </div>
        </div>
      )}
    </>
  )
}

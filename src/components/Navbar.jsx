import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const baseLink = 'text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
  const active = 'text-white bg-blue-600'
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />
            <span className="font-semibold text-gray-900">KalkulusWeb</span>
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={({isActive}) => `${baseLink} ${isActive ? active : ''}`}>Home</NavLink>
            <NavLink to="/materi" className={({isActive}) => `${baseLink} ${isActive ? active : ''}`}>Materi</NavLink>
            <NavLink to="/kalkulator" className={({isActive}) => `${baseLink} ${isActive ? active : ''}`}>Kalkulator</NavLink>
            <NavLink to="/visualisasi" className={({isActive}) => `${baseLink} ${isActive ? active : ''}`}>Visualisasi</NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

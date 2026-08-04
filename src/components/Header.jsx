import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const linkClass = (path) =>
    `text-sm tracking-wide transition-colors ${
      pathname === path ? 'text-ink' : 'text-muted hover:text-ink'
    }`

  return (
    <header className="w-full border-b border-white/10 bg-navy/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <nav className="flex items-center justify-end h-16 md:h-20">
          <div className="hidden sm:flex sm:items-center sm:gap-8">
            <Link to="/" className={linkClass('/')}>
              Home
            </Link>
            <Link to="/about" className={linkClass('/about')}>
              About Me
            </Link>
            <Link to="/projects" className={linkClass('/projects')}>
              Projects
            </Link>
            <Link to="/news" className={linkClass('/news')}>
              News
            </Link>
          </div>

          <button
            type="button"
            className="sm:hidden text-ink p-2"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="sm:hidden pb-4 flex flex-col gap-3">
            <Link to="/" className={linkClass('/')} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              to="/about"
              className={linkClass('/about')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Me
            </Link>
            <Link
              to="/projects"
              className={linkClass('/projects')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/news"
              className={linkClass('/news')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              News
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

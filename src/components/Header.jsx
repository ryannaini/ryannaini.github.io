import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const loadFont = async () => {
      await document.fonts.load('1rem "Inter"')
      document.body.classList.add('font-inter')
    }

    const link = document.createElement('link')
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    loadFont()
  }, [])

  const navLinkClass =
    'group relative px-3 py-2 text-base md:text-lg font-medium text-gray-700 transition-colors font-inter'

  return (
    <header className="w-full bg-teal-300/20 backdrop-blur-sm border-b border-teal-300/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-teal-600 hover:text-teal-700 transition-colors font-inter"
            >
              Shervin
            </Link>
          </div>

          <div className="hidden sm:flex sm:space-x-8">
            <Link to="/projects" className={navLinkClass}>
              <span className="relative">
                Projects
                <span className="absolute bottom-[-24px] left-0 h-[2px] w-full origin-left scale-x-0 transform bg-teal-600 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
            </Link>
            <Link to="/news" className={navLinkClass}>
              <span className="relative">
                News
                <span className="absolute bottom-[-24px] left-0 h-[2px] w-full origin-left scale-x-0 transform bg-teal-600 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
            </Link>
          </div>

          <div className="sm:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-teal-600 p-2 rounded-md transition-colors"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="sm:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/projects"
                className="px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/news"
                className="px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                News
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

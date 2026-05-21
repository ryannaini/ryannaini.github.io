import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter flex flex-col">
      <Header />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 py-8 md:py-12 px-4 md:px-6 bg-white/80 backdrop-blur-sm shadow-md h-auto min-h-[500px] max-w-7xl mx-auto mt-4 md:mt-8 rounded-lg">
        <div className="flex flex-col items-center w-full md:w-1/3">
          <img
            src="/images/profile.png"
            alt="Shervin"
            className="rounded-full w-48 h-48 md:w-72 md:h-72 border-4 border-teal-200 object-cover shadow-lg"
          />
          <div className="mt-4 md:mt-6 flex gap-4 md:gap-6">
            <a
              href="#"
              className="text-gray-600 hover:text-teal-600 transition-colors"
              aria-label="GitHub"
            >
              <Github size={32} />
            </a>
            <a
              href="https://www.linkedin.com/in/shervin-n/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={32} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-teal-600 transition-colors"
              aria-label="Email"
            >
              <Mail size={32} />
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-start w-full md:w-2/3 px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-600 text-center md:text-left">
            Hello! I&apos;m Shervin.
          </h1>
          <div className="flex justify-center md:justify-start">
            <Link to="/projects">
              <button
                type="button"
                className="mt-6 md:mt-8 px-6 md:px-8 py-2 md:py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-base md:text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                View Projects
              </button>
            </Link>
          </div>
        </div>
      </div>

      <section className="bg-teal-50/50 backdrop-blur-sm border-t border-teal-100/20 py-4 md:py-6 mt-8 md:mt-12">
        <p className="text-center text-sm md:text-base text-gray-700 font-medium max-w-4xl mx-auto px-4">
          Latest news: <span className="text-gray-500">Nothing yet.</span>
        </p>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage

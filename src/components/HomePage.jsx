import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import NeuronLattice from './NeuronLattice.jsx'
import { homeContent } from '../data/homeData.jsx'

function HomePage() {
  return (
    <div className="relative min-h-screen bg-navy text-ink flex flex-col font-sans">
      <div className="pointer-events-none fixed inset-0 z-0">
        <NeuronLattice />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
      <Header />

      <main className="relative flex-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-sky/10 blur-3xl"
        />

        <section className="relative max-w-6xl mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-muted">
                Northwestern University
              </p>
              <h1 className="mt-3 font-display text-5xl md:text-6xl font-semibold text-ink tracking-tight">
                {homeContent.name}
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted max-w-md leading-relaxed">
                {homeContent.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center rounded-full bg-sky px-5 py-2.5 text-sm font-semibold text-navy-deep hover:bg-sky-bright transition-colors"
                >
                  About Me
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-sky/50 hover:text-sky transition-colors"
                >
                  Projects
                </Link>
                <Link
                  to="/news"
                  className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-ink hover:border-sky/50 hover:text-sky transition-colors"
                >
                  News
                </Link>
                <div className="flex items-center gap-3 ml-1">
                  <a
                    href="https://github.com/ryannaini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-sky transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shervin-n/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-sky transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={22} />
                  </a>
                  <a
                    href="mailto:shervinnaini2028@u.northwestern.edu"
                    className="text-muted hover:text-sky transition-colors"
                    aria-label="Email"
                  >
                    <Mail size={22} />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:pt-10">
              <img
                src="/images/profile.png"
                alt="Shervin"
                className="mb-6 w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border border-white/15 shadow-lg shadow-black/40"
              />
              <p className="text-base md:text-lg text-muted leading-relaxed">
                {homeContent.bio}
              </p>
            </div>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-6 md:px-8 pb-16 md:pb-24">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink tracking-tight">
            Skills
          </h2>

          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-xs tracking-[0.18em] uppercase text-sky">
                Relevant Coursework
              </h3>
              <p className="mt-3 text-sm md:text-base text-muted leading-relaxed max-w-4xl">
                {homeContent.coursework.join(' · ')}
              </p>
            </div>

            {homeContent.skills.map((group) => (
              <div key={group.label}>
                <h3 className="text-xs tracking-[0.18em] uppercase text-sky">
                  {group.label}
                </h3>
                <p className="mt-3 text-sm md:text-base text-muted leading-relaxed max-w-4xl">
                  {group.items}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      </div>
    </div>
  )
}

export default HomePage

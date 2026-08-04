import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { aboutContent } from '../data/aboutData.jsx'

function AboutPage() {
  return (
    <div className="min-h-screen bg-navy text-ink flex flex-col font-sans">
      <Header />

      <main className="relative flex-1">
        <section className="max-w-6xl mx-auto px-6 md:px-8 pt-14 md:pt-20 pb-16 md:pb-24">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-start">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
                {aboutContent.title}
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted leading-relaxed max-w-xl">
                {aboutContent.intro}
              </p>

              <div className="mt-10 space-y-10">
                {aboutContent.sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="font-display text-2xl text-ink tracking-tight">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="text-base text-muted leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.quote && (
                        <blockquote className="border-l border-sky/50 pl-4 py-1">
                          <p className="font-display text-lg text-ink italic leading-relaxed">
                            {section.quote}
                          </p>
                          {section.quoteAttribution && (
                            <cite className="mt-2 block text-sm text-muted not-italic">
                              — {section.quoteAttribution}
                            </cite>
                          )}
                        </blockquote>
                      )}
                      {section.closing?.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="text-base text-muted leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:pt-2 relative max-w-md md:max-w-none mx-auto md:pr-28">
              <img
                src={aboutContent.photo}
                alt="Shervin at Machu Picchu"
                className="w-full rounded-2xl object-cover border border-white/10 shadow-lg shadow-black/40"
              />
              <p className="absolute bottom-4 -right-2 md:bottom-6 md:-right-4 translate-x-2 md:translate-x-8 font-display text-[11px] md:text-xs text-white leading-snug max-w-[8rem] text-right pointer-events-none">
                I also love love love to travel
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage

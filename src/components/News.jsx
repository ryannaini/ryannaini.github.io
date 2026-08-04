import { useState } from 'react'
import { Search, X } from 'lucide-react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import newsData from '../data/newsData.jsx'

function News() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filterArticles = (articles) => {
    if (!searchTerm) return articles

    const searchRegex = new RegExp(searchTerm, 'i')
    return articles.filter(
      (article) =>
        article.title.match(searchRegex) ||
        article.tags.some((tag) => tag.match(searchRegex)),
    )
  }

  const filteredArticles = filterArticles(newsData)

  return (
    <div className="min-h-screen bg-navy text-ink flex flex-col font-sans">
      <Header />

      <nav className="border-b border-white/10 bg-navy/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex justify-end">
          <div className="relative flex items-center w-full sm:w-72">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-full border border-white/15 bg-navy-soft text-ink placeholder:text-muted/70 focus:outline-none focus:border-sky/50 text-sm"
            />
            <Search
              size={18}
              className="absolute right-3 text-muted pointer-events-none"
            />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-12 flex-grow w-full">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-8">
          News
        </h1>

        {filteredArticles.length > 0 ? (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <button
                key={article.id}
                type="button"
                className="w-full text-left p-5 sm:p-6 rounded-xl border border-white/10 bg-navy-soft/50 hover:border-sky/40 transition-all duration-200"
                onClick={() => setSelectedArticle(article)}
              >
                <h3 className="font-display text-lg sm:text-xl text-ink">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {article.shortDescription}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] rounded-full bg-sky/15 text-sky"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted text-base py-12">
            No news yet. Add entries in{' '}
            <code className="text-sm text-sky/80 px-1">src/data/newsData.jsx</code>
            .
          </p>
        )}
      </main>

      {selectedArticle && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedArticle(null)}
          role="presentation"
        >
          <div
            className="bg-white text-black border border-gray-200 rounded-2xl shadow-2xl p-5 sm:p-7 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
              aria-label="Close"
              onClick={() => setSelectedArticle(null)}
            >
              <X size={22} />
            </button>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-black pr-10">
              {selectedArticle.title}
            </h2>
            <div className="mt-4 text-base text-black leading-relaxed">
              {selectedArticle.fullContent}
            </div>
            <button
              type="button"
              className="mt-6 px-5 py-2 rounded-full bg-sky text-navy-deep text-sm font-semibold hover:bg-sky-bright transition-colors"
              onClick={() => setSelectedArticle(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default News

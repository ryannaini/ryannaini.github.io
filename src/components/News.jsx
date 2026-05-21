import { useState } from 'react'
import { Search } from 'lucide-react'
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
    <div className="min-h-screen bg-white text-gray-800 font-inter flex flex-col">
      <div className="border-b-4 border-teal-300/40">
        <Header />
      </div>

      <nav className="flex justify-start items-center bg-teal-50/50 backdrop-blur-sm py-4 sm:py-6 px-4 sm:px-36 shadow-sm">
        <div className="relative flex items-center w-64">
          <button
            type="button"
            className="absolute right-0 p-2 text-teal-600 hover:text-teal-700 transition-colors z-10"
            aria-label="Search"
          >
            <Search size={24} />
          </button>
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 pr-10 rounded-full border border-teal-100 focus:outline-none focus:border-teal-300 transition-all duration-300"
          />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
        <h1 className="text-4xl font-bold text-teal-600 mb-12">News</h1>

        {filteredArticles.length > 0 ? (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                role="button"
                tabIndex={0}
                className="p-6 rounded-lg shadow-md bg-white/80 backdrop-blur-sm border border-teal-100/20 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedArticle(article)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedArticle(article)
                  }
                }}
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {article.shortDescription}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-teal-100 text-teal-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg py-12">
            No news yet. Add entries in{' '}
            <code className="text-sm bg-gray-100 px-1 rounded">
              src/data/newsData.jsx
            </code>
            .
          </p>
        )}
      </main>

      {selectedArticle && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedArticle(null)}
          role="presentation"
        >
          <div
            className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h2 className="text-2xl font-semibold">{selectedArticle.title}</h2>
            <div className="mt-4">{selectedArticle.fullContent}</div>
            <button
              type="button"
              className="mt-6 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
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

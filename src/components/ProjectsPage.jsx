import { useState } from 'react'
import { Github, Search, X } from 'lucide-react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import projectsData from '../content/projects/index.jsx'

const CATEGORIES = [
  'All',
  'Robotics & Embedded Systems',
  'ML / Research',
  'Accessibility-Driven Design',
]

function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filterProjects = (projects) => {
    let filtered = projects

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((project) =>
        project.labels.includes(selectedCategory),
      )
    }

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'i')
      filtered = filtered.filter(
        (project) =>
          project.title.match(searchRegex) ||
          project.tags.some((tag) => tag.match(searchRegex)) ||
          project.labels.some((label) => label.match(searchRegex)) ||
          project.shortDescription.match(searchRegex),
      )
    }

    return filtered
  }

  const filteredProjects = filterProjects(projectsData)

  return (
    <div className="min-h-screen bg-navy text-ink flex flex-col font-sans">
      <Header />

      <nav className="border-b border-white/10 bg-navy/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-sky text-navy-deep font-semibold'
                    : 'border border-white/15 text-muted hover:text-ink hover:border-sky/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative flex items-center w-full sm:w-auto justify-end">
            <div
              className={`flex items-center transition-all duration-300 ${
                isSearchExpanded ? 'w-full sm:w-64' : 'w-10'
              }`}
            >
              <button
                type="button"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="absolute right-0 p-2 text-muted hover:text-sky transition-colors z-10"
                aria-label="Toggle search"
              >
                <Search size={20} />
              </button>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full py-2 px-4 pr-10 rounded-full border border-white/15 bg-navy-soft text-ink placeholder:text-muted/70 focus:outline-none focus:border-sky/50 transition-all duration-300 text-sm ${
                  isSearchExpanded ? 'opacity-100' : 'opacity-0 w-0 p-0 border-0'
                }`}
                style={{ pointerEvents: isSearchExpanded ? 'auto' : 'none' }}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-12 flex-grow w-full">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-8">
          Projects
        </h1>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                className="text-left rounded-xl border border-white/10 bg-navy-soft/50 overflow-hidden hover:border-sky/40 hover:-translate-y-0.5 transition-all duration-200"
                onClick={() => setSelectedProject(project)}
              >
                <div className="h-40 bg-navy-deep/80 border-b border-white/10 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs tracking-[0.16em] uppercase text-muted/70">
                      Photo coming soon
                    </span>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-lg text-ink leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {project.shortDescription}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.labels.map((label) => (
                      <span
                        key={label}
                        className="px-2.5 py-1 text-[11px] rounded-full bg-sky/15 text-sky"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted py-12">No projects match that filter.</p>
        )}
      </main>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div
            className="bg-white text-black border border-gray-200 rounded-2xl shadow-2xl p-5 sm:p-7 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
              aria-label="Close"
              onClick={() => setSelectedProject(null)}
            >
              <X size={22} />
            </button>

            <h2
              id="project-modal-title"
              className="font-display text-2xl md:text-3xl font-semibold text-black pr-10"
            >
              {selectedProject.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedProject.labels.map((label) => (
                <span
                  key={label}
                  className="px-2.5 py-1 text-[11px] rounded-full bg-sky/20 text-sky"
                >
                  {label}
                </span>
              ))}
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] rounded-full border border-gray-300 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(selectedProject.videos?.length > 0 || selectedProject.video) && (
              <div
                className={`mt-5 gap-4 ${
                  (selectedProject.videos?.length || 0) > 1
                    ? 'grid grid-cols-1 sm:grid-cols-2'
                    : ''
                }`}
              >
                {(selectedProject.videos?.length > 0
                  ? selectedProject.videos
                  : [selectedProject.video]
                ).map((src) => (
                  <div
                    key={src}
                    className="rounded-xl overflow-hidden border border-gray-200 bg-black"
                  >
                    <video
                      src={src}
                      controls
                      playsInline
                      className="w-full max-h-[22rem] bg-black"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            )}

            {(() => {
              const hasVideos =
                selectedProject.videos?.length > 0 || selectedProject.video
              const popupImages =
                selectedProject.detailImages?.length > 0
                  ? selectedProject.detailImages
                  : !hasVideos && selectedProject.detailImage
                    ? [selectedProject.detailImage]
                    : !hasVideos && selectedProject.image
                      ? [selectedProject.image]
                      : []

              const rotate = selectedProject.rotateDetailImages || 0

              const stackImages = selectedProject.stackDetailImages

              const fillImage = selectedProject.fillDetailImage

              return popupImages.length > 0 && !stackImages ? (
                <div
                  className={`mt-5 gap-4 ${
                    popupImages.length > 1
                      ? 'grid grid-cols-1 sm:grid-cols-2'
                      : 'space-y-4'
                  }`}
                >
                  {popupImages.map((src) => (
                    <div
                      key={src}
                      className={`rounded-xl overflow-hidden border border-gray-200 ${
                        fillImage
                          ? 'bg-black'
                          : 'bg-gray-50 flex items-center justify-center min-h-56 sm:min-h-64'
                      }`}
                    >
                      <img
                        src={src}
                        alt={selectedProject.title}
                        className={
                          fillImage
                            ? 'w-full h-auto block'
                            : 'max-w-full max-h-56 sm:max-h-64 object-contain bg-white'
                        }
                        style={
                          rotate
                            ? { transform: `rotate(${rotate}deg)` }
                            : undefined
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : null
            })()}

            <div className="mt-5 text-base text-black leading-relaxed space-y-3 [&_.text-muted]:text-gray-700 [&_.text-ink]:text-black">
              {selectedProject.fullContent}
            </div>

            {selectedProject.stackDetailImages &&
              selectedProject.detailImages?.length > 0 && (
                <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  {selectedProject.detailImages.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${selectedProject.title} code`}
                      className="w-full object-contain bg-white border-b border-gray-100 last:border-b-0"
                    />
                  ))}
                </div>
              )}

            {selectedProject.pdf && (
              <div className="mt-5">
                <a
                  href={selectedProject.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky hover:text-sky-bright transition-colors text-sm font-medium mb-3"
                >
                  Open schematic PDF
                </a>
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <iframe
                    title={`${selectedProject.title} schematic PDF`}
                    src={selectedProject.pdf}
                    className="w-full h-[28rem] bg-white"
                  />
                </div>
              </div>
            )}

            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sky hover:text-sky-bright transition-colors text-sm font-medium"
              >
                <Github size={18} />
                View on GitHub
              </a>
            )}

            <div className="mt-6">
              <button
                type="button"
                className="px-5 py-2 rounded-full bg-sky text-navy-deep text-sm font-semibold hover:bg-sky-bright transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProjectsPage

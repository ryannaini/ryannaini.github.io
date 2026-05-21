import { useState } from 'react'
import { Search } from 'lucide-react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import projectsData from '../content/projects/index.jsx'

const CATEGORIES = ['All', 'Data Science', 'Robotics', 'Web Development']

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
          project.labels.some((label) => label.match(searchRegex)),
      )
    }

    return filtered
  }

  const filteredProjects = filterProjects(projectsData)

  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter flex flex-col">
      <Header />

      <nav className="flex flex-col sm:flex-row justify-between items-center bg-teal-50/50 backdrop-blur-sm py-4 sm:py-6 px-4 sm:px-36 shadow-sm mx-auto gap-4 sm:gap-0 w-full">
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-md transition-all duration-200 text-sm sm:text-base ${
                selectedCategory === category
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md'
                  : 'bg-white/80 text-gray-700 border border-teal-100 hover:border-teal-300 hover:bg-teal-50'
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
              className="absolute right-0 p-2 text-teal-600 hover:text-teal-700 transition-colors z-10"
              aria-label="Toggle search"
            >
              <Search size={24} />
            </button>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-2 px-4 pr-10 rounded-full border border-teal-100 focus:outline-none focus:border-teal-300 transition-all duration-300 text-sm sm:text-base ${
                isSearchExpanded ? 'opacity-100' : 'opacity-0 w-0 p-0'
              }`}
              style={{ pointerEvents: isSearchExpanded ? 'auto' : 'none' }}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex-grow w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 mb-4">
          Projects
        </h1>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id ?? project.title}
                role="button"
                tabIndex={0}
                className="p-4 sm:p-6 rounded-lg shadow-md bg-white/80 backdrop-blur-sm border border-teal-100/20 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedProject(project)
                  }
                }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {project.shortDescription}
                </p>
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg my-4"
                  />
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.labels.map((label) => (
                    <span
                      key={label}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-teal-100 text-teal-700"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-base sm:text-lg py-12">
            No projects yet. Add entries in{' '}
            <code className="text-sm bg-gray-100 px-1 rounded">
              src/content/projects/
            </code>
            .
          </p>
        )}
      </main>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              {selectedProject.title}
            </h2>
            <div className="prose prose-sm sm:prose max-w-none">
              {selectedProject.fullContent}
            </div>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-sm sm:text-base transition-colors"
              onClick={() => setSelectedProject(null)}
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

export default ProjectsPage

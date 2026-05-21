import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import News from './components/News.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  )
}

export default App

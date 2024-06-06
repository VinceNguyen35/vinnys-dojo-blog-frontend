// React Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page Imports
import Home from './pages/Home';
import BlogNew from './pages/BlogNew';
import BlogEdit from './pages/BlogEdit';
import BlogShow from './pages/BlogShow';
import NotFound from './pages/NotFound';

// Component Imports
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Router>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs/new" element={<BlogNew />} />
            <Route path="/blogs/:id" element={<BlogShow />} />
            <Route path="/edit" element={<BlogEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App

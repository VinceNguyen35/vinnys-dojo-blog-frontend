// Page Imports
import Home from './pages/Home';
import BlogCreate from './pages/BlogCreate';
import BlogEdit from './pages/BlogEdit';
import BlogShow from './pages/BlogShow';
import NotFound from './pages/NotFound';

// Component Imports
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Home />
      <BlogCreate />
      <BlogEdit />
      <BlogShow />
      <NotFound />
    </div>
  )
}

export default App

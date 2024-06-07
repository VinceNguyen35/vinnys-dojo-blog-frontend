// React Imports
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page Imports
import Home from './pages/Home';
import Blogs from "./pages/Blogs";
import BlogNew from './pages/BlogNew';
import BlogEdit from './pages/BlogEdit';
import BlogShow from './pages/BlogShow';
import NotFound from './pages/NotFound';

// Component Imports
import Navbar from './components/Navbar';

// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "./redux/blogsSlice";
import type { RootState, AppDispatch } from "./redux/store";

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    if(blogs.status === "idle") {
      dispatch(getBlogs());
    }
  }, [blogs.status, dispatch]);

  return (
    <div className='app'>
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
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

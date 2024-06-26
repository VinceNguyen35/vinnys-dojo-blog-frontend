// React Imports
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page Imports
import Home from './pages/Home';
import Blogs from "./pages/blogs/Blogs";
import BlogNew from './pages/blogs/BlogNew';
import BlogEdit from './pages/blogs/BlogEdit';
import BlogDelete from "./pages/blogs/BlogDelete";
import BlogShow from './pages/blogs/BlogShow';
import Categories from "./pages/categories/Categories";
import CategoriesShow from "./pages/categories/CategoriesShow";
import NotFound from './pages/NotFound';

// Component Imports
import Header from './components/Header';
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
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/new" element={<BlogNew />} />
        <Route path="/blogs/:id" element={<BlogShow />} />
        <Route path="/blogs/:id/edit" element={<BlogEdit />} />
        <Route path="/blogs/:id/delete" element={<BlogDelete />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<CategoriesShow />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

// React Imports
import { useNavigate } from "react-router-dom";

// Redux Imports
import type { RootState } from "../redux/store";
import type { Blog } from "../redux/blogsSlice";
import { useSelector } from "react-redux";

const BlogList = () => {

    // React Router Navigation
    const navigate = useNavigate();

    // Redux Selector
    const {blogs} = useSelector((state: RootState) => state.blogs);

    return (
        <div className="blog-list">
            {blogs.map((blog: Blog, index: number) => (
                <div
                    className="blog" 
                    key={index}
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                    <h1>{blog.title}</h1>
                    <h3>By {blog.author}</h3>
                    <h6>Written on {blog.created}</h6>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    );
}
 
export default BlogList;
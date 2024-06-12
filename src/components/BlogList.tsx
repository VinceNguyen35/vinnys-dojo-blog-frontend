// React Imports
import { useNavigate } from "react-router-dom";

// Redux Imports
import type { RootState } from "../redux/store";
import type { Blog } from "../redux/blogsSlice";
import { useSelector } from "react-redux";

// Date Imports
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

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
                    <h2>{blog.title}</h2>
                    <h4>By {blog.author}</h4>
                    <h6>Written on {formatDistanceToNow(new Date(blog.created), { addSuffix: true })}</h6>
                </div>
            ))}
        </div>
    );
}
 
export default BlogList;
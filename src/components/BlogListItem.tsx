// React Imports
import { useNavigate } from "react-router-dom";

// Type Imports
import type { Blog } from "../redux/blogsSlice";

// Date Imports
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

// Interface for Prop Type
interface BlogListItemProps {
    blog: Blog;
    index: number;
}

const BlogListItem = ({blog, index}: BlogListItemProps) => {

    // Router Variables
    const navigate = useNavigate();

    return (
        <article
            className="blog-list-item"
            key={index}
            onClick={() => navigate(`/blogs/${blog.id}`)}
        >
            <h3>{blog.title}</h3>
            <h4>By {blog.author}</h4>
            <h5>Category: {blog.category}</h5>
            <h6>Written {formatDistanceToNow(new Date(blog.created), { addSuffix: true })}</h6>
        </article>
    );
}
 
export default BlogListItem;
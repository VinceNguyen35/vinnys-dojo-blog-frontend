// React Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux Imports
import type { Blog } from "../redux/blogsSlice";

// Date Imports
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const BlogShow = () => {

    // Router Variables
    const {id} = useParams();

    // State Variable
    const [blog, setBlog] = useState<Blog>({
        id: 0,
        title: "",
        author: "",
        content: "",
        created: "2024-06-11T18:56:37.000Z"
    });

    // Find the Blog
    useEffect(() => {
        const fetchBlog = async () => {
            const response: Response = await fetch(`http://13.57.55.157/api/blogs/${id}`);
            const json = await response.json();
            // Response will return an array of objects if working
            if (response.ok) {
                setBlog(json[0]);
            }
        }
        fetchBlog();
    }, [id]);

    return (
        <div className="blog-show">
            <div className="blog">
                <h1>{blog.title}</h1>
                <h3>By {blog.author}</h3>
                <h6>Written {formatDistanceToNow(new Date(blog.created), { addSuffix: true })}</h6>
                <p>{blog.content}</p>
            </div>
        </div>
    );
}
 
export default BlogShow;
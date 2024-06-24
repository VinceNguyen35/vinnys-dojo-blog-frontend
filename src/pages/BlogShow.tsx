// React Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Redux Imports
import type { Blog } from "../types/blog";
import { deleteBlog } from "../redux/blogsSlice";
import { useDispatch } from "react-redux";

// Date Imports
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const BlogShow = () => {

    // React Router Variables
    const {id} = useParams();
    const navigate = useNavigate();

    // Redux Variables
    const dispatch = useDispatch();

    // State Variable
    const [blog, setBlog] = useState<Blog>({
        id: 0,
        title: "",
        author: "",
        category: "",
        content: "",
        created: "2024-06-11T18:56:37.000Z"
    });

    // Find the Blog
    useEffect(() => {
        const fetchBlog = async () => {
            const response: Response = await fetch(`https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs/${id}`);
            const json = await response.json();
            // Response will return an array of objects if working
            if (response.ok) {
                setBlog(json[0]);
            }
        }
        fetchBlog();
    }, [id]);

    // Handle Deleting a Blog
    const handleDelete = async () => {
        const response = await fetch(`https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs/${id}`, {
            method: "DELETE"
        });
        const json = await response.json();
        // Response will return an array of 1 object if working
        if (!response.ok) {
            console.log(json.error);
        }
        if (response.ok) {
            console.log("Blog Deleted", json[0]);
            dispatch(deleteBlog(json[0]));
            navigate("/");
        }
    }

    return (
        <main className="blog-show">
            <div className="blog">
                <h2>{blog.title}</h2>
                <h3>By {blog.author}</h3>
                <h4>Category: {blog.category}</h4>
                <h6>Written {formatDistanceToNow(new Date(blog.created), { addSuffix: true })}</h6>
                <p>{blog.content}</p>
            </div>
            <div>
                <div
                    className="button edit"
                    onClick={() => navigate(`/blogs/${blog.id}/edit`)}
                >
                    Edit
                </div>
                <div
                    className="button delete"
                    onClick={() => handleDelete()}
                >
                    Delete
                </div>
            </div>
        </main>
    );
}
 
export default BlogShow;
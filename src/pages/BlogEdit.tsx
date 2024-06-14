// React Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Redux Imports
import type { Blog } from "../redux/blogsSlice";
import { updateBlog } from "../redux/blogsSlice";
import { useDispatch } from "react-redux";

const BlogEdit = () => {

    // React Router Variables
    const {id} = useParams();
    const navigate = useNavigate();

    // Redux Dispatch
    const dispatch = useDispatch();

    // State Variables
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [content, setContent] = useState<string>("");

    // Find the Blog
    useEffect(() => {
        const fetchBlog = async () => {
            const response: Response = await fetch(`http://13.57.55.157/api/blogs/${id}`);
            const json: Blog[] = await response.json();
            // Response will return an array of objects if working
            if (response.ok) {
                setTitle(json[0].title);
                setAuthor(json[0].author);
                setCategory(json[0].content);
                setContent(json[0].content);
            }
        }
        fetchBlog();
    }, [id]);

    // Submit Event
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const blog = { title, author, category, content };
        const response = await fetch(`http://13.57.55.157/api/blogs/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        });
        const json = await response.json();
        // Response will return an array of 1 object if working
        if (!response.ok) {
            console.log(json.error);
        }
        if (response.ok) {
            setTitle("");
            setAuthor("");
            setCategory("");
            setContent("");
            console.log("Blog Updated", json[0]);
            dispatch(updateBlog(json[0]));
            navigate(`/blogs/${json[0].id}`);
        }
    }

    return (
        <div className="blog-edit">
            <form onSubmit={handleSubmit}>
                <h3>Add a New Blog</h3>
                <label>Blog Title</label>
                <input
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                />
                <label>Blog Author</label>
                <input
                    type="text"
                    onChange={(event) => setAuthor(event.target.value)}
                    value={author}
                />
                <label>Blog Category</label>
                <input
                    type="text"
                    onChange={(event) => setCategory(event.target.value)}
                    value={category}
                />
                <label>Blog Content</label>
                <textarea
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />
                <button>Update Blog</button>
            </form>
        </div>
    );
}
 
export default BlogEdit;
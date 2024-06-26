// React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useDispatch } from "react-redux";
import { addBlog } from "../../redux/blogsSlice";

const BlogNew = () => {

    // State Variables
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [content, setContent] = useState<string>("");

    // React Router Navigation
    const navigate = useNavigate();

    // Redux Dispatch
    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const blog = { title, author, category, content };
        const response = await fetch("https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        });
        const json = await response.json();
        // Response will return an array of 1 object if working
        if(!response.ok) {
            console.log(json.error);
        }
        if(response.ok) {
            setTitle("");
            setAuthor("");
            setCategory("");
            setContent("");
            console.log("New blog added", json[0]);
            dispatch(addBlog(json[0]));
            navigate(`/blogs/${json[0].id}`);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="blog-new">
            <h2>Add a New Blog</h2>
            <label>Blog Title</label>
            <input
                type="text"
                required
                onChange={(event) => setTitle(event.target.value)}
                value={title}
            />
            <label>Blog Author</label>
            <input
                type="text"
                required
                onChange={(event) => setAuthor(event.target.value)}
                value={author}
            />
            <label>Blog Category</label>
            <input
                type="text"
                required
                onChange={(event) => setCategory(event.target.value)}
                value={category}
            />
            <label>Blog Content</label>
            <textarea
                required
                onChange={(event) => setContent(event.target.value)}
                value={content}
            />
            <button>Add Blog</button>
        </form>
    );
}
 
export default BlogNew;
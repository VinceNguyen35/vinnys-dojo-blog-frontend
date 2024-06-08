// React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useDispatch } from "react-redux";
import { addBlog } from "../redux/blogsSlice";

const BlogNew = () => {

    // State Variables
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    // React Router Navigation
    const navigate = useNavigate();

    // Redux Dispatch
    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const blog = { title, author, content };
        const response = await fetch("http://localhost:3000/api/blogs", {
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
            setContent("");
            console.log("New blog added", json[0]);
            dispatch(addBlog(json[0]));
            navigate(`/blogs/${json[0].id}`);
        }
    }

    return (
        <div className="blog-new">
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
                <label>Blog Content</label>
                <textarea
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />
                <button>Add Blog</button>
            </form>
        </div>
    );
}
 
export default BlogNew;
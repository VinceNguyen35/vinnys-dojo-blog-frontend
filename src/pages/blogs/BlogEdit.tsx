// React Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Type Imports
import type { Blog } from "../../types/blog";
import type { RootState } from "../../redux/store";

// Redux Imports
import { updateBlog } from "../../redux/blogsSlice";
import { addCategory, deleteCategory } from "../../redux/categoriesSlice";
import { useSelector, useDispatch } from "react-redux";

const BlogEdit = () => {

    // React Router Variables
    const {id} = useParams();
    const navigate = useNavigate();

    // Redux Variables
    const { categories } = useSelector((state: RootState) => state.categories);
    const { blogs } = useSelector((state: RootState) => state.blogs);
    const dispatch = useDispatch();

    // State Variables
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [oldCategory, setOldCategory] = useState<string>("");
    const [content, setContent] = useState<string>("");

    // Find the Blog
    useEffect(() => {
        const fetchBlog = async () => {
            const response: Response = await fetch(`https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs/${id}`);
            const json: Blog[] = await response.json();
            // Response will return an array of objects if working
            if (response.ok) {
                setTitle(json[0].title);
                setAuthor(json[0].author);
                setCategory(json[0].category);
                setOldCategory(json[0].category);
                setContent(json[0].content);
            }
        }
        fetchBlog();
    }, [id]);

    // Submit Event
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const blog = { title, author, category, content };
        const response = await fetch(`https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs/${id}`, {
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
            dispatch(updateBlog(json[0]));
            checkAddCategory(category);
            checkDeleteCategory(oldCategory);
            setTitle("");
            setAuthor("");
            setCategory("");
            setOldCategory("");
            setContent("");
            console.log("Blog Updated", json[0]);
            console.log(categories);
            console.log(blogs);
            navigate(`/blogs/${json[0].id}`);
        }
    }

    // Helper Functions
    const checkAddCategory = (value: string) => {
        console.log(categories);
        if (!categories.some(object => object.category === value)) {
            dispatch(addCategory(value));
        }
    }

    const checkDeleteCategory = (value: string) => {
        console.log(blogs);
        if (blogs.some(blog => blog.category === value)) {
            dispatch(deleteCategory(value));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="blog-edit">
            <h2>Edit Blog</h2>
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
            <button className="button-update">Update Blog</button>
        </form>
    );
}
 
export default BlogEdit;
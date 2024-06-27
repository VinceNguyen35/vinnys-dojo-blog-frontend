// React Imports
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Redux Imports
import { deleteBlog } from "../../redux/blogsSlice";
import { getLatestBlog } from "../../redux/latestBlogSlice";
import { deleteCategory } from "../../redux/categoriesSlice";
import { useSelector, useDispatch } from "react-redux";

// Type Imports
import type { RootState, AppDispatch } from "../../redux/store";

// Component Imports
import SecretKeyMessage from "../../components/SecretKeyMessage";

const BlogDelete = () => {

    // State Variables
    const [secretKey, setSecretKey] = useState<string>("");
    const [isSecretKeyWrong, setIsSecretKeyWrong] = useState<boolean>(false);

    // React Router Variables
    const { id } = useParams();
    const navigate = useNavigate();

    // Redux Variables
    const { blogs } = useSelector((state: RootState) => state.blogs);
    const dispatch = useDispatch<AppDispatch>();

    // Handle Delete
    const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (secretKey === "VinceNguyen35") {
            setSecretKey("");
            setIsSecretKeyWrong(false);
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
                checkDeleteCategory(json[0].category);
                dispatch(getLatestBlog());
                navigate("/");
            }
            navigate("/");
        } else {
            setIsSecretKeyWrong(true);
        }
    }

    const checkDeleteCategory = (value: string) => {
        // There should only be one blog with the category left before
        // we update the blog AND delete the category
        if (blogs.filter(blog => blog.category === value).length === 1) {
            dispatch(deleteCategory(value));
        }
    }

    return (
        <form onSubmit={handleDelete} className="blog-delete">
            <label>Type in the Secret Key to Delete Blog</label>
            <input
                type="text"
                required
                onChange={(event) => setSecretKey(event.target.value)}
                value={secretKey}
            />
            {
                isSecretKeyWrong &&
                <SecretKeyMessage />
            }
            <button className="button-delete">Delete Blog</button>
        </form>
    );
}
 
export default BlogDelete;
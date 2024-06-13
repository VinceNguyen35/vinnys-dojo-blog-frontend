// React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Type Imports
import type { Blog } from "../redux/blogsSlice";

// Date Imports
import { formatDistanceToNow } from "date-fns";

const LatestBlog = () => {

    // State Variables
    const [latestBlog, setLatestBlog] = useState<Blog>({
        id: 0,
        title: "",
        author: "",
        content: "",
        created: "2024-06-11T18:56:37.000Z"
    });

    // Router Variables
    const navigate = useNavigate();

    // useEffect Hook
    useEffect(() => {
        const fetchLatestBlog = async () => {
            const response: Response = await fetch(`http://13.57.55.157/api/blogs/latest`);
            const json = await response.json();
            // Response will return an array of objects if working
            if (response.ok) {
                setLatestBlog(json[0]);
            }
        }
        fetchLatestBlog();
    }, []);

    return (
        <div className="latest-blog">
            <h2>Latest Blog:</h2>
            <div
                className="blog"
                onClick={() => navigate(`/blogs/${latestBlog.id}`)}
            >
                <h2>{latestBlog.title}</h2>
                <h4>By {latestBlog.author}</h4>
                <h6>Written on {formatDistanceToNow(new Date(latestBlog.created), { addSuffix: true })}</h6>
            </div>
        </div>
    );
}
 
export default LatestBlog;
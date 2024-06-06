// React Imports
import { useEffect } from "react";

const BlogList = () => {

    useEffect(() => {
        const fetchBlogList = async () => {
            const response = await fetch("http://localhost:3000/api/blogs");
            const json = await response.json();
            // Response will return an array of objects if working
            if (response.ok) {
                console.log(json);
            }
        };
        fetchBlogList();
    }, []);

    return (
        <div className="blog-list">
            Blog List Here
        </div>
    );
}
 
export default BlogList;
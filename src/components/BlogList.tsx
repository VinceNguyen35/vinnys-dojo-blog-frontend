// React Imports
import { useState, useEffect } from "react";

const BlogList = () => {

    interface Blog {
        id: number,
        title: string,
        author: string,
        content: string,
        created: string
    }

    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogList = async () => {
            const response: Response = await fetch("http://localhost:3000/api/blogs");
            const json: Blog[] = await response.json();
            // Response will return an array of objects if working
            if (response.ok) {
                setBlogs(json);
            }
        };
        fetchBlogList();
    }, []);

    return (
        <div className="blog-list">
            {blogs.map((blog: Blog, index: number) => (
                <div className="blog" key={index}>
                    <h1>{blog.title}</h1>
                    <h3>By {blog.author}</h3>
                    <h6>Written on {blog.created}</h6>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    );
}
 
export default BlogList;
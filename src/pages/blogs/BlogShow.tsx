// React Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Type Imports
import type { Blog } from "../../types/blog";

// Date Imports
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

// HTML Parser Imports
import DOMPurify from "dompurify";
import parse from "html-react-parser";

// Component Imports
import Loading from "../../components/Loading";

const BlogShow = () => {

    // React Router Variables
    const {id} = useParams();
    const navigate = useNavigate();

    // State Variable
    const [blog, setBlog] = useState<Blog>({
        id: 0,
        title: "",
        author: "",
        category: "",
        content: "",
        created: "2024-06-11T18:56:37.000Z"
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Find the Blog
    useEffect(() => {
        const fetchBlog = async () => {
            const response: Response = await fetch(`https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs/${id}`);
            const json = await response.json();
            // Response will return an array of objects if working
            if (response.ok) {
                setBlog(json[0]);
                setIsLoading(false);
            } else {
                setIsLoading(true);
            }
        }
        fetchBlog();
    }, [id]);

    // Parse the Blog Content
    const sanitizedContent = DOMPurify.sanitize(blog.content);

    return (
        <main className="blog-show">
            {
                isLoading &&
                <Loading />
            }
            {
                !isLoading &&
                <section>
                    <article className="blog">
                        <h2>{blog.title}</h2>
                        <h3>By {blog.author}</h3>
                        <h4>Category: {blog.category}</h4>
                        <h6>Written {formatDistanceToNow(new Date(blog.created), { addSuffix: true })}</h6>
                        <p>{parse(sanitizedContent)}</p>
                    </article>
                    <button
                        className="button-edit"
                        onClick={() => navigate(`/blogs/${blog.id}/edit`)}
                    >
                        Edit
                    </button>
                    <button
                        className="button-delete"
                        onClick={() => navigate(`/blogs/${blog.id}/delete`)}
                    >
                        Delete
                    </button>
                </section>
            }
        </main>
    );
}
 
export default BlogShow;
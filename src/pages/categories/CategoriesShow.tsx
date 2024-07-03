// React Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Type Imports
import { Blog } from "../../types/blog";

// Component Imports
import BlogListItem from "../../components/blogs/BlogListItem";
import Loading from "../../components/Loading";

const CategoriesShow = () => {

    // State Variables
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Router Variables
    const {category} = useParams();

    // useEffect Hook
    useEffect(() => {
        const fetchBlogs = async () => {
            const response: Response = await fetch(`https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs/categories/${category}`)
            const json = await response.json();
            // Response will return an array of objects if working
            if (response.ok) {
                setBlogs(json);
                setIsLoading(false);
            } else {
                setIsLoading(true);
            }
        }
        fetchBlogs();
    }, [category]);

    return ( 
        <main className="blogs">
            {
                isLoading &&
                <Loading />
            }
            {
                !isLoading &&
                <section>
                    <h2>All {category} Blogs:</h2>
                    {blogs.map((blog: Blog, index: number) => (
                        <BlogListItem
                            key={index}
                            blog={blog}
                            index={index}
                        />
                    ))}
                </section>
            }
        </main>
    );
}
 
export default CategoriesShow;
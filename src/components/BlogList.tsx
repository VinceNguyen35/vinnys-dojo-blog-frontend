// React Imports
// import { useEffect } from "react";

// Redux Imports
import type { RootState } from "../redux/store";
import type { Blog } from "../redux/blogsSlice";
import { useSelector } from "react-redux";

const BlogList = () => {

    const {blogs} = useSelector((state: RootState) => state.blogs);
    
    // useEffect(() => {
    //     const getBlogs = async () => {
    //         await this.blogs;
    //     }
    //     getBlogs();
    // }, [blogs]);

    // useEffect(() => {
    //     dispatch(getBlogs());
    //     console.log(blogs);
    // }, [blogs, dispatch]);

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
// Redux Imports
import type { RootState } from "../redux/store";
import type { Blog } from "../redux/blogsSlice";
import { useSelector } from "react-redux";

// Component Imports
import BlogListItem from "./BlogListItem";

const BlogList = () => {

    // Redux Selector
    const {blogs} = useSelector((state: RootState) => state.blogs);

    return (
        <section className="blog-list">
            {blogs.map((blog: Blog, index: number) => (
                <BlogListItem
                    key={index}
                    blog={blog}
                    index={index}
                />
            ))}
        </section>
    );
}
 
export default BlogList;
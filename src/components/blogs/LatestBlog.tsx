// React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { getLatestBlog } from "../../redux/latestBlogSlice";
import { RootState, AppDispatch } from "../../redux/store";

// Date Imports
import { formatDistanceToNow } from "date-fns";

// Component Imports
import Loading from "../Loading";

const LatestBlog = () => {

    // Router Variables
    const navigate = useNavigate();

    // Redux Variables
    const dispatch = useDispatch<AppDispatch>();
    const latestBlog = useSelector((state: RootState) => state.latestBlog);

    // State Variables
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // useEffect Hook
    useEffect(() => {
        if(latestBlog.status === "idle") {
            setIsLoading(true);
            dispatch(getLatestBlog());
        } else {
            setIsLoading(false);
        }
    }, [dispatch, latestBlog.status]);

    return (
        <section>
            {
                isLoading &&
                <Loading />
            }
            {
                !isLoading &&
                <article
                    className="latest-blog"
                    onClick={() => navigate(`/blogs/${latestBlog.latestBlog.id}`)}
                >
                    <h2>Latest Blog:</h2>
                    <h3>{latestBlog.latestBlog.title}</h3>
                    <h4>By {latestBlog.latestBlog.author}</h4>
                    <h5>Category: {latestBlog.latestBlog.category}</h5>
                    <h6>Written {formatDistanceToNow(new Date(latestBlog.latestBlog.created), { addSuffix: true })}</h6>
                </article>
            }
        </section>
    );
}
 
export default LatestBlog;
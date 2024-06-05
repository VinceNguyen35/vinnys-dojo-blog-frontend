// Component Imports
import BlogList from "../components/BlogList";
import LatestBlog from "../components/LatestBlog";

const Home = () => {
    return (
        <div className="home">
            Home Page Here
            <LatestBlog />
            <BlogList />
        </div>
    );
}
 
export default Home;
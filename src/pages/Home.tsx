// Component Imports
import Bio from "../components/Bio";
import LatestBlog from "../components/blogs/LatestBlog";
import Sidebar from "../components/Sidebar";

const Home = () => {
    return (
        <main className="home">
            <section className="info-main">
                <Bio />
                <LatestBlog />
            </section>
            <section className="info-side">
                <Sidebar />
            </section>
        </main>
    );
}
 
export default Home;
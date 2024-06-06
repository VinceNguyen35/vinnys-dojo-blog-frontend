import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Vinny's Dojo Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/blogs">Blogs</Link>
                <Link to="/blogs/new">New Blog</Link>
            </div>
        </div>
    );
}
 
export default Navbar;
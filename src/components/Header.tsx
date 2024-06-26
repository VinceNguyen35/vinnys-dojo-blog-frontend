// React Imports
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Link to="/">
            <h1 className="header">
                <img
                    src="./ninja.svg"
                    alt="an image of ninja armor"
                    className="logo"
                />
                Vinny's Dojo Blog
            </h1>
        </Link>
    );
}
 
export default Header;
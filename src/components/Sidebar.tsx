// React Imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../redux/categoriesSlice";
import { RootState, AppDispatch } from "../redux/store";

// Type Imports
import type { Category } from "../types/category";

const Sidebar = () => {

    // Router Variables
    const navigate = useNavigate();

    // Redux Variables
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories);

    // useEffect Hook
    useEffect(() => {
        if (categories.status === "idle") {
            dispatch(getCategories());
        }
    }, [categories.status, dispatch]);

    return (
        <aside className="sidebar">
            <h2>Categories:</h2>
            {categories.categories.map((category: Category, index: number) => (
                <h3
                    key={index}
                    className="category"
                    onClick={() => navigate(`/categories/${category.category}`)}
                >
                    {category.category}
                </h3>
            ))}
        </aside>
    );
}
 
export default Sidebar;
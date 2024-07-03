// React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../redux/categoriesSlice";
import { RootState, AppDispatch } from "../redux/store";

// Type Imports
import type { Category } from "../types/category";

// Component Imports
import Loading from "./Loading";

const Sidebar = () => {

    // Router Variables
    const navigate = useNavigate();

    // Redux Variables
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories);

    // State Variables
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // useEffect Hook
    useEffect(() => {
        if (categories.status === "idle") {
            dispatch(getCategories());
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [categories.status, dispatch]);

    return (
        <aside className="sidebar">
            {
                isLoading &&
                <Loading />
            }
            {
                !isLoading &&
                <section>
                    <h2>Categories:</h2>
                    {
                        categories.categories.map((category: Category, index: number) => (
                            <h3
                                key={index}
                                className="category"
                                onClick={() => navigate(`/categories/${category.category}`)}
                            >
                                {category.category}
                            </h3>
                        ))
                    }
                </section>
            }
        </aside>
    );
}
 
export default Sidebar;
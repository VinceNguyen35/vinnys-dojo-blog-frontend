import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../types/category";

export interface CategoriesState {
    categories: Category[],
    status: string,
    error: string | null
}

const initialState: CategoriesState = {
    categories: [],
    status: 'idle',
    error: null
};

export const getCategories = createAsyncThunk("blogs/getCategories", async () => {
    const response: Response = await fetch("https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs/categories");
    const json: Category[] = await response.json();
    // Response will return an array of objects if working
    if (response.ok) {
        return json;
    }
});

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: (state: CategoriesState, action: PayloadAction<string>) => {
            state.categories.push({ category: action.payload });
        },
        deleteCategory: (state: CategoriesState, action: PayloadAction<string>) => {
            // Find the category to delete
            const indexOfDeletedCategory: number = state.categories.findIndex((category) => category.category === action.payload);
            // Delete the category
            state.categories.splice(indexOfDeletedCategory, 1);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload as Category[];
            state.status = "succeeded";
        }),
            builder.addCase(getCategories.rejected, (state) => {
            state.status = "failed";
        })
    }
});

export const { addCategory, deleteCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Blog {
    id: number,
    title: string,
    author: string,
    content: string,
    created: string
}

export interface BlogsState {
    blogs: Blog[],
    status: string,
    error: string | null
}

const initialState: BlogsState = {
    blogs: [],
    status: 'idle',
    error: null
};

export const getBlogs = createAsyncThunk("blogs/getBlogs", async () => {
    const response: Response = await fetch("http://13.57.55.157/api/blogs");
    const json: Blog[] = await response.json();
    // Response will return an array of objects if working
    if (response.ok) {
        return json;
    }
});

export const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        addBlog: (state: BlogsState, action: PayloadAction<Blog>) => {
            state.blogs.unshift(action.payload);
        },
        updateBlog: (state: BlogsState, action: PayloadAction<Blog>) => {
            // Find the blog to update
            const idOfUpdatedBlog: number = action.payload.id;
            const indexOfUpdatedBlog: number = state.blogs.findIndex((blog) => blog.id === idOfUpdatedBlog);
            // Update the blog
            state.blogs[indexOfUpdatedBlog] = action.payload;
        },
        deleteBlog: (state: BlogsState, action: PayloadAction<Blog>) => {
            // Find the blog to delete
            const idOfDeletedBlog: number = action.payload.id;
            const indexOfDeletedBlog: number = state.blogs.findIndex((blog) => blog.id === idOfDeletedBlog);
            // Delete the blog
            state.blogs.splice(indexOfDeletedBlog, 1);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload as Blog[];
            state.status = "succeeded";
        }),
        builder.addCase(getBlogs.rejected, (state) => {
            state.status = "failed";
        })
    }
});

export const { addBlog, updateBlog, deleteBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
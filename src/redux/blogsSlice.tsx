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
    const response: Response = await fetch("http://localhost:3000/api/blogs");
    const json: Blog[] = await response.json();
    // Response will return an array of objects if working
    if (response.ok) {
        console.log(json);
        return json;
    }
});

export const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        addBlog: (state: BlogsState, action: PayloadAction<Blog>) => {
            state.blogs.unshift(action.payload);
        }
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

export const { addBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
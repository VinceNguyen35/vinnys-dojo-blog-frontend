import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Blog } from "../types/blog";

export interface LatestBlogState {
    latestBlog: Blog,
    status: string,
    error: string | null
}

const initialState: LatestBlogState = {
    latestBlog: {
        id: 0,
        title: "",
        author: "",
        category: "",
        content: "",
        created: "2024-06-11T18:56:37.000Z"
    },
    status: 'idle',
    error: null
};

export const getLatestBlog = createAsyncThunk("blogs/getLatestBlog", async () => {
    const response: Response = await fetch("https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs/latest");
    const json: Blog[] = await response.json();
    // Response will return an array of 1 object if working
    if (response.ok) {
        return json[0];
    }
});

export const latestBlogSlice = createSlice({
    name: "latestBlog",
    initialState,
    reducers: {
        updateLatestBlog: (state: LatestBlogState, action: PayloadAction<Blog>) => {
            state.latestBlog = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLatestBlog.fulfilled, (state, action) => {
            state.latestBlog = action.payload as Blog;
            state.status = "succeeded";
        }),
        builder.addCase(getLatestBlog.rejected, (state) => {
            state.status = "failed";
        })
    }
});

export const { updateLatestBlog } = latestBlogSlice.actions;

export default latestBlogSlice.reducer;
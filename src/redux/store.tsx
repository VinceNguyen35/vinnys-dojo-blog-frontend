import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./blogsSlice";
import latestBlogReducer from "./latestBlogSlice";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        latestBlog: latestBlogReducer,
        categories: categoriesReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
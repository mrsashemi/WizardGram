import { configureStore } from "@reduxjs/toolkit"
import { allPostsSlice } from '../features/posts/getAllPostsSlice'
import { newPostSlice } from "../features/posts/newPostSlice"

// the redux store will hold the global state for the application
export const store = configureStore({
    reducer: {
        allPosts: allPostsSlice.reducer,
        newImage: newPostSlice.reducer
    },
    devTools: true
})
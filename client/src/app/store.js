import { configureStore } from "@reduxjs/toolkit"
import { allPostsSlice } from '../features/posts/getAllPostsSlice'

// the redux store will hold the global state for the application
export const store = configureStore({
    reducer: {
        allPosts: allPostsSlice.reducer
    }
})
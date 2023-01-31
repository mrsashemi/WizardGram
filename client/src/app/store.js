import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../features/api/apiSlice"
import { allPostsSlice } from '../features/posts/getAllPostsSlice'
import { newPostSlice } from "../features/posts/newPostSlice"

// the redux store will hold the global state for the application
export const store = configureStore({
    reducer: {
        allPosts: allPostsSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        newImage: newPostSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
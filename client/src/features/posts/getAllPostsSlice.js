import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
const GET_ALL_POSTS_URL = '/posts/get-all-fishstaposts'


const initialState = {
    allPosts: null,
    status: 'idle', //'idle' || 'loading' || 'succeeded' || 'failed',
    error: null
}

// thunk is a piece of work that does delayed work
export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
    try {
        const result = await axios.get(GET_ALL_POSTS_URL, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        });
        return [...result.data.postList.slice(0).reverse()]
    } catch (error) {
        console.error(error);
        return error.message
    }
})


export const allPostsSlice = createSlice({
    name: 'allPosts',
    initialState,
    reducers: {
        incrementPostLikes(state, action) {
            const newAllPosts = state.allPosts;
            newAllPosts[action.payload][0].likes = newAllPosts[action.payload][0].likes+1;
            state.allPosts = newAllPosts;
        },
        decrementPostLikes(state, action) {
            const newAllPosts = state.allPosts;
            newAllPosts[action.payload][0].likes = newAllPosts[action.payload][0].likes-1;
            state.allPosts = newAllPosts;
        },
        deleteSelectedPost(state, action) {
            const newAllPosts = state.allPosts;
            delete newAllPosts[action.payload];
            state.allPosts = newAllPosts;
        },
        archiveSelectedPost(state, action) {
            const newAllPosts = state.allPosts;
            newAllPosts[action.payload][0].archived = (newAllPosts[action.payload][0].archived) ? false : true;
            state.allPosts = newAllPosts;
        },
        hidePostLikes(state, action) {
            const newAllPosts = state.allPosts;
            newAllPosts[action.payload][0].show_likes = (newAllPosts[action.payload][0].show_likes) ? false : true;
            state.allPosts = newAllPosts;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'

                let hash = {};
                for (let i = 0; i < action.payload.length; i++) {
                    let key = action.payload[i].post_id;

                    if (key in hash) {
                        hash[key] = [...hash[key], action.payload[i]];
                    } else {
                        hash[key] = [action.payload[i]];
                    }
                }
                console.log(hash)
                state.allPosts = hash;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const selectAllPosts = (state) => state.allPosts.allPosts;
export const getAllPostsStatus = (state) => state.allPosts.status;
export const getAllPostsError = (state) => state.allPosts.error;

export const { incrementPostLikes, decrementPostLikes, deleteSelectedPost, archiveSelectedPost, hidePostLikes } = allPostsSlice.actions

export default allPostsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
const GET_ALL_POSTS_URL = '/posts/get-all-fishstaposts'


const initialState = {
    allPosts: null,
    allPostsInitial: null,
    selectedId: null,
    editing: false,
    expanded: false,
    currentGrid: "artwork",
    status: 'idle', //'idle' || 'loading' || 'succeeded' || 'failed',
    error: null
}

// thunk is a piece of code that does delayed work in redux toolkit
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
            const newAllPostsInitial = state.allPostsInitial
            newAllPosts[action.payload][0].likes = newAllPosts[action.payload][0].likes+1;
            newAllPostsInitial[action.payload][0].likes = newAllPostsInitial[action.payload][0].likes+1;
            state.allPosts = newAllPosts;
            state.allPostsInitial = newAllPostsInitial;
        },
        decrementPostLikes(state, action) {
            const newAllPosts = state.allPosts;
            const newAllPostsInitial = state.allPostsInitial
            newAllPosts[action.payload][0].likes = newAllPosts[action.payload][0].likes-1;
            newAllPostsInitial[action.payload][0].likes = newAllPostsInitial[action.payload][0].likes-1;
            state.allPosts = newAllPosts;
            state.allPostsInitial = newAllPostsInitial;
        },
        deleteSelectedPost(state, action) {
            const newAllPosts = state.allPosts;
            const newAllPostsInitial = state.allPostsInitial
            delete newAllPosts[action.payload];
            delete newAllPostsInitial[action.payload];
            state.allPosts = newAllPosts;
            state.allPostsInitial = newAllPostsInitial;
        },
        archiveSelectedPost(state, action) {
            const newAllPosts = state.allPosts;
            const newAllPostsInitial = state.allPostsInitial
            newAllPosts[action.payload][0].archived = (newAllPosts[action.payload][0].archived) ? false : true;
            newAllPostsInitial[action.payload][0].archived = (newAllPostsInitial[action.payload][0].archived) ? false : true;
            state.allPosts = newAllPosts;
            state.allPostsInitial = newAllPostsInitial;
        },
        hidePostLikes(state, action) {
            const newAllPosts = state.allPosts;
            const newAllPostsInitial = state.allPostsInitial
            newAllPosts[action.payload][0].show_likes = (newAllPosts[action.payload][0].show_likes) ? false : true;
            newAllPostsInitial[action.payload][0].show_likes = (newAllPostsInitial[action.payload][0].show_likes) ? false : true;
            state.allPosts = newAllPosts;
            state.allPostsInitial = newAllPostsInitial;
        },
        editPostBody(state, action) {
            const newAllPosts = state.allPosts;
            const newAllPostsInitial = state.allPostsInitial
            newAllPosts[action.payload[0]][0].body = action.payload[1];
            newAllPostsInitial[action.payload[0]][0].body = action.payload[1];
            state.allPosts = newAllPosts;
            state.allPostsInitial = newAllPostsInitial;
        },
        changeCurrentGrid(state, action) {
            state.currentGrid = action.payload;

            const newAllPosts = state.allPostsInitial;
            state.allPosts = [...Object.keys(newAllPosts)]
                .filter(k => newAllPosts[k][0].archived === false && newAllPosts[k][0].post_type === action.payload)
                .sort((x,y) => new Date(newAllPosts[y][0].date_created) - new Date(newAllPosts[x][0].date_created))
                .reduce((curr, k) => {return Object.assign(curr, {[k]: newAllPosts[k]})}, {});
        },
        selectSinglePost(state, action) {
            const newAllPosts = state.allPostsInitial;
            state.allPosts = [...Object.keys(newAllPosts)]
                .filter(k => newAllPosts[k][0].post_id === action.payload)
                .reduce((curr, k) => {return Object.assign(curr, {[k]: newAllPosts[k]})}, {});
        },
        choosePostId(state, action) {
            state.selectedId = action.payload;
        },
        editSinglePost(state, action) {
            state.editing = action.payload;
        },
        expandSinglePost(state, action) {
            state.expanded = action.payload;
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
   
                state.allPosts = hash;
                state.allPostsInitial = hash;
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
export const getPostId = (state) => state.allPosts.selectedId;
export const getEditing = (state) => state.allPosts.editing;
export const getExpanded = (state) => state.allPosts.expanded;
export const getCurrentGrid = (state) => state.allPosts.currentGrid;

export const { 
    incrementPostLikes, 
    decrementPostLikes, 
    deleteSelectedPost, 
    archiveSelectedPost, 
    hidePostLikes, 
    editPostBody, 
    changeCurrentGrid,
    selectSinglePost,
    choosePostId,
    editSinglePost,
    expandSinglePost 
} = allPostsSlice.actions

export default allPostsSlice.reducer;
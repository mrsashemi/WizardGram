import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import axios from "../../api/axios";
const GET_ALL_POSTS_URL = '/posts/get-all-fishstaposts'

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.post[0].date_created.localeCompare(a.post[0].date_created)
})

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => GET_ALL_POSTS_URL,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedPosts = [...responseData.postList.slice(0).reverse()].map(post => {
                    post.id = post.post_id
                    return post
                });

                console.log(loadedPosts)

                const hash = {};
                for (let i = 0; i < loadedPosts.length; i++) {
                    let key = loadedPosts[i].id;

                    if (key in hash) {
                        hash[key].post = [...hash[key].post, loadedPosts[i]];
                    } else {
                        hash[key] = {id: key, post: [loadedPosts[i]]};
                    }
                }

                return postsAdapter.setAll(initialState, hash)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Posts', id: 'LIST' },
                        ...result.ids.map(id => ({type: 'Posts', id}))
                    ]
                } else {
                    return [{type: 'Posts', id: 'LIST'}]
                }
            }

        }),
        getPostsById: builder.query({
            query: id => `/posts/${id}`,
            transformResponse: responseData => {
                const loadedPost = responseData.map(post => {
                    post.id = post.post_id
                    return post
                });
                return postsAdapter.setAll(initialState, loadedPost)
            },
            providesTags: (result, error, arg) => {
                return [...result.ids.map(id => ({type: 'Post', id}))]
            }
        }),
        updatePost: builder.mutation({
            query: ({postId, update}) => ({
                url: `posts/update-post/${postId}`,
                method: 'PUT',
                body: { 
                    body: (update.prop === "body") ? update.val : update.post.body,
                    theme_id: update.post.theme_id,
                    title: update.post.title,
                    date_updated: update.date,
                    likes: (update.prop === "likes") ? update.val : update.post.likes,
                    show_likes: (update.prop === "showLikes") ? update.val : update.post.show_likes,
                    archived: (update.prop === "archived") ? update.val : update.post.archived
                }
            }),
            async onQueryStarted({postId, update}, {dispatch, queryFulfilled}) {
                //updateQueryData requires the endpoint name and cache key arguments,
                //so it knows which piece of cache state to update
                const putResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        //the draft is immer-wrapped and can be mutated like in createslice
                        const post = draft.entities[postId];
                        if (post) {
                            post.post[0].body = (update.prop === "body") ? update.val : update.post.body
                            post.post[0].theme_id = update.post.theme_id
                            post.post[0].title = update.post.title
                            post.post[0].date_updated = update.date
                            post.post[0].likes = (update.prop === "likes") ? update.val : update.post.likes
                            post.post[0].show_likes = (update.prop === "showLikes") ? update.val : update.post.show_likes
                            post.post[0].archived = (update.prop === "archived") ? update.val : update.post.archived
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    putResult.undo()
                }
            }
        }),
        deletePost: builder.mutation({
            query: ({id}) => ({
                url: `/post/delete-post/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Posts', id: arg.id }
            ]
        })


    })
})

export const {
    useGetPostsQuery,
    useGetPostsByIdQuery,
    useUpdatePostMutation,
    useDeletePostMutation
} = extendedApiSlice

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPost,
    selectById: selectPostById,
    selectIds: selectUserIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)




// thunk is a piece of code that allows async work in redux toolkit
export const getAllPosts = createAsyncThunk('posts/getAllPosts', async (id) => {
    try {
        const result = await axios.get(GET_ALL_POSTS_URL, {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        });
        return [[...result.data.postList.slice(0).reverse()], id]
    } catch (error) {
        console.error(error);
        return error.message
    }
})


export const allPostsSlice = createSlice({
    name: 'allPosts',
    initialState: {
        allPosts: null,
        allPostsInitial: null,
        selectedId: null,
        editing: false,
        expanded: false,
        currentGrid: "artwork",
        postMessage: null,
        status: 'idle', //'idle' || 'loading' || 'succeeded' || 'failed',
        error: null
    },
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
        },
        changePostMessage(state, action) {
            state.postMessage = action.payload;
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
                for (let i = 0; i < action.payload[0].length; i++) {
                    let key = action.payload[0][i].post_id;

                    if (key in hash) {
                        hash[key] = [...hash[key], action.payload[0][i]];
                    } else {
                        hash[key] = [action.payload[0][i]];
                    }
                }

                state.allPostsInitial = hash;
                if (action.payload[1]) {
                    const newAllPosts = hash;
                    state.allPosts = [...Object.keys(newAllPosts)]
                        .filter(k => newAllPosts[k][0].post_id === Number(action.payload[1]))
                        .reduce((curr, k) => {return Object.assign(curr, {[k]: newAllPosts[k]})}, {});
                } else {
                    const newAllPosts = hash;
                    state.allPosts = [...Object.keys(newAllPosts)]
                        .filter(k => newAllPosts[k][0].archived === false && newAllPosts[k][0].post_type === state.currentGrid)
                        .sort((x,y) => new Date(newAllPosts[y][0].date_created) - new Date(newAllPosts[x][0].date_created))
                        .reduce((curr, k) => {return Object.assign(curr, {[k]: newAllPosts[k]})}, {});
                } 
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
export const getPostMessage = (state) => state.allPosts.postMessage;

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
    expandSinglePost,
    changePostMessage 
} = allPostsSlice.actions

export default allPostsSlice.reducer; 
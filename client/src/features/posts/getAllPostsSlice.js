import { createSlice, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchWithBQ } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../api/apiSlice";
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

                const hash = {};
                for (let i = 0; i < loadedPosts.length; i++) {  
                    let key = loadedPosts[i].id;

                    if (key in hash) {
                        hash[key].post[loadedPosts[i].slider_order] = loadedPosts[i];
                    } else {
                        hash[key] = {id: key, post: []};
                        hash[key].post[loadedPosts[i].slider_order] = loadedPosts[i]
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
            query: id => `/posts/get-post/${id}`,
            transformResponse: responseData => {
                const loadedPost = [...responseData.postList.slice(0)].map(post => {
                    post.id = post.post_id
                    return post
                });
                
                const hash = {};
                for (let i = 0; i < loadedPost.length; i++) {
                    let key = loadedPost[i].id;

                    if (key in hash) {
                        hash[key].post = [...hash[key].post, loadedPost[i]];
                    } else {
                        hash[key] = {id: key, post: [loadedPost[i]]};
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
        updatePost: builder.mutation({
            query: ({update}) => ({
                url: `posts/update-post/${update.post.post_id}`,
                method: 'PUT',
                body: JSON.stringify({ 
                    body: (update.prop === "body") ? update.val : update.post.body,
                    theme_id: update.post.theme_id,
                    title: update.post.title,
                    date_updated: update.date,
                    likes: (update.prop === "likes") ? update.val : update.post.likes,
                    show_likes: (update.prop === "showLikes") ? update.val : update.post.show_likes,
                    archived: (update.prop === "archived") ? update.val : update.post.archived
                }),
            }),
            async onQueryStarted({update}, {dispatch, queryFulfilled}) {
                //updateQueryData requires the endpoint name and cache key arguments,
                //so it knows which piece of cache state to update
                const putResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        //the draft is immer-wrapped and can be mutated like in createslice
                        const post = draft.entities[update.post.post_id];
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

                const putSpecificResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPostsById', update.post.post_id, draft => {
                        //this draft is to update te individual post in case it exists in the cache
                        const post = draft.entities[update.post.post_id];
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
                    console.log(error)
                    putResult.undo()
                    putSpecificResult.undo()
                }
            }
        }),
        deletePost: builder.mutation({
            query: ({id}) => ({
                url: `/posts/delete-post/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Posts', id: arg.id }
            ]
        }),
        addNewPost: builder.mutation({
            queryFn: async ({newPost}, queryApi, extraOptions, fetchWithBQ) => {
                const multiplePosts = [];
                for (let i = 0; i < newPost.newImage.length; i++) {
                    const createClass = await fetchWithBQ({
                        url: '/classes/create-class',
                        method: 'POST',
                        body: JSON.stringify({
                            filter_class: newPost.newImage[i].filter_class, 
                            fit_class: newPost.newImage[i].fit_class, 
                            position_x: newPost.newImage[i].position_x, 
                            position_y: newPost.newImage[i].position_y, 
                            scale: newPost.newImage[i].scale, 
                            brightness: newPost.newImage[i].brightness, 
                            contrast: newPost.newImage[i].contrast, 
                            saturate: newPost.newImage[i].saturate, 
                            grayscale: newPost.newImage[i].grayscale, 
                            sepia: newPost.newImage[i].sepia, 
                            hue: newPost.newImage[i].hue, 
                            opacity: newPost.newImage[i].opacity, 
                            blur: newPost.newImage[i].blur, 
                            rotate: newPost.newImage[i].rotate, 
                            vignette: newPost.newImage[i].vignette, 
                            vignette_class: newPost.newImage[i].vignette_class, 
                            vignette_blur: newPost.newImage[i].vignette_blur, 
                            vignette_spread: newPost.newImage[i].vignette_spread,
                            unedited: newPost.newImage[i].original
                        })
                    })

                    if (createClass?.error?.data?.class_id) {
                        multiplePosts.push({imgId: newPost.newImage[i].id, classId: createClass.error.data.class_id})
                    } else if (createClass.data) {
                        multiplePosts.push({imgId: newPost.newImage[i].id, classId: createClass.data.class_id})
                    } else if (createClass.error) {
                        console.log(createClass.error)
                        return createClass.error;
                    }
                }

                const createPost = await fetchWithBQ({
                    url: '/posts/create-post',
                    method: 'POST',
                    body: JSON.stringify({
                        post_type: newPost.post.postType,
                        title: newPost.post.postTitle,
                        body: newPost.post.message,
                        img_id: multiplePosts[0].imgId,
                        class_id: multiplePosts[0].classId
                    })
                })

                if (createPost.error) {
                    console.log(multiplePosts);
                    console.log(createPost.error);
                    return createPost.error
                }

                for (let i = 1; i < multiplePosts.length; i++) {
                    const addToRelationalTable = await fetchWithBQ({
                        url: '/posts/add-images-classes-to-post/',
                        method: 'POST',
                        body: JSON.stringify({
                            img_id: multiplePosts[i].imgId,
                            post_id: createPost.data.post_id,
                            class_id: multiplePosts[i].classId,
                            order: i
                        })
                    })
                    if (addToRelationalTable.error) {
                        console.log(addToRelationalTable.error)
                        return addToRelationalTable.error
                    }
                }

                return createPost.data;
            },
            invalidatesTags: (result, error, arg) => {
                if (error) return error
                else return [{type: 'Posts', id: 'LIST'}]
        }
        })


    })
})

export const {
    useGetPostsQuery,
    useGetPostsByIdQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddNewPostMutation
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



// Global state for other post operations
export const allPostsSlice = createSlice({
    name: 'allPosts',
    initialState: {
        selectedId: null,
        editing: false,
        expanded: false,
        currentGrid: "artwork",
        postMessage: null,
    },
    reducers: {
        changeCurrentGrid(state, action) {
            state.currentGrid = action.payload;
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
    }
});

export const getPostId = (state) => state.allPosts.selectedId;
export const getEditing = (state) => state.allPosts.editing;
export const getExpanded = (state) => state.allPosts.expanded;
export const getCurrentGrid = (state) => state.allPosts.currentGrid;
export const getPostMessage = (state) => state.allPosts.postMessage;

export const { 
    changeCurrentGrid,
    choosePostId,
    editSinglePost,
    expandSinglePost,
    changePostMessage 
} = allPostsSlice.actions

export default allPostsSlice.reducer; 
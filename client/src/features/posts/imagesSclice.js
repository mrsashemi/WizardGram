import { createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { apiSlice } from "../api/apiSlice";
const SAVE_IMG_URL = '/img/save-image';
const GET_ALL_IMG_URL = '/img/get-all-images';

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

export const extendedApiImageSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getImages: builder.query({
            query: () => GET_ALL_IMG_URL,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedPosts = [...responseData.imageList.slice(0).reverse()].map(img => {
                    img.id = img.img_id
                    return img
                });

                let list = [{id: 1, images: loadedPosts}];

                return postsAdapter.setAll(initialState, list)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Images', id: 'LIST' },
                        ...result.ids.map(id => ({type: 'Posts', id}))
                    ]
                } else {
                    return [{type: 'Images', id: 'LIST'}]
                }
            }

        }),
        addNewImageFile: builder.mutation({
            queryFn: async ({formData}, queryApi, extraOptions, fetchWithBQ) => {
                try {
                    const result = await axios.post(SAVE_IMG_URL, formData, 
                        {
                            headers: {'Content-Type': 'multipart/form-data'},
                            withCredentials: true,
                        });
                        if (result) return result;  
                } catch (error) {
                    console.error(error);
                }
            },
            invalidatesTags: [
                {type: 'Images', id: 'LIST'}
            ]
        })
    })
})

export const {
    useGetImagesQuery,
    useAddNewImageFileMutation
} = extendedApiImageSlice

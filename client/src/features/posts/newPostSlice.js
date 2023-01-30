import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    newImageReference: {
        id: "",
        url: null,
        position_x: 0,
        position_y: 0,
        scale: 1,
        fit_class: "coverImg",
        filter_class: "no-filter",
        brightness: 100,
        contrast: 100,
        saturate: 100,
        grayscale: 0,
        sepia: 0,
        hue: 0,
        opacity: 100,
        blur: 0,
        rotate: 0,
        vignette: false,
        vignette_class: "vignette",
        vignette_blur: 0,
        vignette_spread: 0,
        original: true,
        theme: "photography"
    },
    newImage: [{
        id: "",
        url: null,
        position_x: 0,
        position_y: 0,
        scale: 1,
        fit_class: "coverImg",
        filter_class: "no-filter",
        brightness: 100,
        contrast: 100,
        saturate: 100,
        grayscale: 0,
        sepia: 0,
        hue: 0,
        opacity: 100,
        blur: 0,
        rotate: 0,
        vignette: false,
        vignette_class: "vignette",
        vignette_blur: 0,
        vignette_spread: 0,
        original: true,
        theme: "photography"
    }],
    postMultiple: false,
    newImageIndex: 0
}

export const newPostSlice = createSlice({
    name: 'newPost',
    initialState, 
    reducers: {
        chooseUnedited(state, action) {
            if (state.newImage[state.newImageIndex].filter_class === "no-filter" 
            && state.newImage[state.newImageIndex].brightness === 100
            && state.newImage[state.newImageIndex].contrast === 100
            && state.newImage[state.newImageIndex].saturate === 100
            && state.newImage[state.newImageIndex].grayscale === 0
            && state.newImage[state.newImageIndex].sepia === 0
            && state.newImage[state.newImageIndex].hue === 0
            && state.newImage[state.newImageIndex].blur === 0
            && state.newImage[state.newImageIndex].fit_class === "coverImg") {
                const tempNewImage = state.newImage;
                tempNewImage[state.newImageIndex].original = true;
                state.newImage = tempNewImage;
            } else {
                const tempNewImage = state.newImage;
                tempNewImage[state.newImageIndex].original = false;
                state.newImage = tempNewImage;
            }
        },
        updateImageUrlId(state, action) {
            if (state.postMultiple) {
                let indexCheck = state.newImage.findIndex(i => i.id === action.payload[1]);
                console.log(indexCheck);

                if (indexCheck === -1) {
                    state.newImageIndex = state.newImageIndex+1;
                    const tempNewImage = state.newImage;
                    state.newImage = [...tempNewImage, state.newImageReference]
                } else {
                    state.newImageIndex = state.newImageIndex-1;
                    const tempNewImage = state.newImage
                    state.newImage = [...tempNewImage.slice(0, indexCheck), ...tempNewImage.slice(indexCheck+1)]
                }
            }

            const tempNewImage = state.newImage;
            if (tempNewImage[state.newImageIndex]) {
                tempNewImage[state.newImageIndex].url = action.payload[0];
                tempNewImage[state.newImageIndex].id = action.payload[1];
                state.newImage = tempNewImage;
            } 
        },
        postMultipleImages(state, action) {
            state.postMultiple = action.payload;
        },
        adjustNewImageFit(state, action) {
            const tempNewImage = state.newImage;
            tempNewImage[state.newImageIndex].fit_class = (tempNewImage[state.newImageIndex].fit_class === "coverImg") ? "containImg" : "coverImg";
            tempNewImage[state.newImageIndex].position_x = 0;
            tempNewImage[state.newImageIndex].position_y = 0;
            tempNewImage[state.newImageIndex].scale = 1;
            state.newImage = tempNewImage;
        },
        adjustNewImagePos(state, action) {
            const tempNewImage = state.newImage;
            if (action.payload === "middleMiddle") {
                tempNewImage[state.newImageIndex].scale = tempNewImage[state.newImageIndex].scale+0.01;
            } else if (action.payload === "middleLeft") {
                tempNewImage[state.newImageIndex].position_x = tempNewImage[state.newImageIndex].position_x-0.25;
            } else if (action.payload === "middleRight") {
                tempNewImage[state.newImageIndex].position_x = tempNewImage[state.newImageIndex].position_x+0.25;
            } else if (action.payload === "topMiddle") {
                tempNewImage[state.newImageIndex].position_y = tempNewImage[state.newImageIndex].position_y-0.25;
            } else if (action.payload === "bottomMiddle") {
                tempNewImage[state.newImageIndex].position_y = tempNewImage[state.newImageIndex].position_y+0.25
            } else if (action.payload === "topLeft") {
                tempNewImage[state.newImageIndex].position_x = tempNewImage[state.newImageIndex].position_x-0.25
                tempNewImage[state.newImageIndex].position_y = tempNewImage[state.newImageIndex].position_y-0.25
            } else if (action.payload === "topRight") {
                tempNewImage[state.newImageIndex].position_x = tempNewImage[state.newImageIndex].position_x+0.25
                tempNewImage[state.newImageIndex].position_y = tempNewImage[state.newImageIndex].position_y-0.25
            } else if (action.payload === "bottomLeft") {
                tempNewImage[state.newImageIndex].position_x = tempNewImage[state.newImageIndex].position_x-0.25
                tempNewImage[state.newImageIndex].position_y = tempNewImage[state.newImageIndex].position_y+0.25
            } else if (action.payload === "bottomRight") {
                tempNewImage[state.newImageIndex].position_x = tempNewImage[state.newImageIndex].position_x+0.25
                tempNewImage[state.newImageIndex].position_y = tempNewImage[state.newImageIndex].position_y+0.25
            }
            state.newImage = tempNewImage;
        },
        addMultipleImages(state, action) {
            state.postMultiple = true;
        },
        cancelMultipleImages(state, action) {
            state.postMultiple = false;
            const tempNewImage = [state.newImage[0]];
            state.newImage = tempNewImage;
        },
        changeImageIndex(state, action) {
            state.newImageIndex = action.payload;
        },
        resetImages(state, index) {
            state.newImage = [state.newImageReference];
        }, 
        changeFilter(state, action) {
            const tempNewImage = state.newImage;
            tempNewImage[state.newImageIndex].filter = action.payload;
            state.newImage = tempNewImage;
         }
    }
})

export const getNewImage = (state) => state.newImage.newImage;
export const getPostMultiple = (state) => state.newImage.postMultiple;
export const getNewImageIndex = (state) => state.newImage.newImageIndex;

export const { 
    chooseUnedited, 
    updateImageUrlId,
    postMultipleImages,
    adjustNewImageFit,
    adjustNewImagePos,
    addMultipleImages,
    changeImageIndex,
    cancelMultipleImages,
    resetImages,
    changeFilter
} = newPostSlice.actions;

export default newPostSlice.reducer;
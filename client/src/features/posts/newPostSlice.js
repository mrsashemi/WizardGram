import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    postType: "",
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
    newImageIndex: 0,
    rotating: false,
    isUsingFilter: true,
    filterClasses: [
        ["None", "no-filter"],
        ["1977", "filter-1977"],
        ["Aden", "filter-aden"],
        ["Amaro", "filter-amaro"],
        ["Ashby", "filter-ashby"],
        ["Brannan", "filter-brannan"],
        ["Brooklyn", "filter-brooklyn"],
        ["Charmes", "filter-charmes"],
        ["Crema", "filter-crema"],
        ["Dogpatch", "filter-dogpatch"],
        ["Earlybird", "filter-earlybird"],
        ["Gingham", "filter-gingham"],
        ["Ginza", "filter-ginza"],
        ["Helena", "filter-helena"],
        ["Hudson", "filter-hudson"],
        ["Inkwell", "filter-inkwell"],
        ["Kelvin", "filter-kelvin"],
        ["Kuno", "filter-kuno"],
        ["Lark", "filter-lark"],
        ["Lo-fi", "filter-lofi"],
        ["Ludwig", "filter-ludwig"],
        ["Maven", "filter-maven"],
        ["Mayfair", "filter-mayfair"],
        ["Moon", "filter-moon"],
        ["Nashville", "filter-nashville"],
        ["Perpetua", "filter-perpetua"],
        ["Poprocket", "filter-poprocket"],
        ["Reyes", "filter-reyes"],
        ["Rise", "filter-rise"],
        ["Sierra", "filter-sierra"],
        ["Skyline", "filter-skyline"],
        ["Slumber", "filter-slumber"],
        ["Stinson", "filter-stinson"],
        ["Sutro", "filter-sutro"],
        ["Toaster", "filter-toaster"],
        ["Valencia", "filter-valencia"],
        ["Vesper", "filter-vesper"],
        ["Walden", "filter-walden"],
        ["Willow", "filter-willow"],
        ["X-Pro II", "filter-xpro-ii"]
    ],
    newImageTitle: "",
    newImageBodyMessage: "",
    scaleReminder: null
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
            let indexCheck = state.newImage.findIndex(i => i.id === action.payload[1]);
            if (state.postMultiple) {
                if (indexCheck === -1) {
                    state.newImageIndex = state.newImageIndex+1;
                    const tempNewImage = state.newImage;
                    state.newImage = [...tempNewImage, state.newImageReference]
                } else {
                    state.newImageIndex = state.newImageIndex-1;
                    const tempNewImage = state.newImage
                    const spliceTemp = tempNewImage.splice(indexCheck, 1)
                    state.newImage = tempNewImage;
                }
            }

            const tempNewImage = state.newImage;
            if (tempNewImage[state.newImageIndex] && indexCheck === -1) {
                tempNewImage[state.newImageIndex].url = action.payload[0];
                tempNewImage[state.newImageIndex].id = action.payload[1];
                state.newImage = tempNewImage;
            } else if (indexCheck > -1 && state.postMultiple && tempNewImage.length === 0) {
                state.postMultiple = false;
                state.newImageIndex = 0;
                tempNewImage.push(state.newImageReference);
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
            state.newImageIndex = 0;
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
        },
        rotateNewImage(state, action) {
            state.rotating = action.payload;
        },
        manageScaleForRotatedImage(state, action) {
            const tempNewImage = state.newImage;
            if (action.payload[0] === "middleMiddle") {
                tempNewImage[state.newImageIndex].scale = tempNewImage[state.newImageIndex].scale+0.01;
            } else if (action.payload[0] === "middleLeft") {
                tempNewImage[state.newImageIndex].scale = tempNewImage[state.newImageIndex].scale-0.01;
            } else if (action.payload[0] === "middleRight") {
                tempNewImage[state.newImageIndex].scale = action.payload[1];
            }
            state.newImage = tempNewImage;
        },
        manageFilterUsage(state, action) {
            state.isUsingFilter = action.payload
        },
        selectFilterForNewImage(state, action) {
            const newTempImage = state.newImage;
            newTempImage[state.newImageIndex].filter_class = action.payload;
            state.newImage = newTempImage;
        },
        adjustImageValue(state, action) {
            const newTempImage = state.newImage;
            newTempImage[state.newImageIndex].brightness = (action.payload[0] === "brightness") ? action.payload[1] : newTempImage[state.newImageIndex].brightness
            newTempImage[state.newImageIndex].contrast = (action.payload[0] === "contrast") ? action.payload[1] : newTempImage[state.newImageIndex].contrast
            newTempImage[state.newImageIndex].saturate = (action.payload[0] === "saturate") ? action.payload[1] : newTempImage[state.newImageIndex].saturate
            newTempImage[state.newImageIndex].grayscale = (action.payload[0] === "grayscale") ? action.payload[1] : newTempImage[state.newImageIndex].grayscale
            newTempImage[state.newImageIndex].sepia = (action.payload[0] === "sepia") ? action.payload[1] : newTempImage[state.newImageIndex].sepia
            newTempImage[state.newImageIndex].hue = (action.payload[0] === "hue-rotate") ? action.payload[1] : newTempImage[state.newImageIndex].hue
            newTempImage[state.newImageIndex].opacity = (action.payload[0] === "opacity") ? action.payload[1] : newTempImage[state.newImageIndex].opacity
            newTempImage[state.newImageIndex].blur = (action.payload[0] === "blur") ? action.payload[1] : newTempImage[state.newImageIndex].blur
            newTempImage[state.newImageIndex].rotate = (action.payload[0] === "rotate") ? action.payload[1] : newTempImage[state.newImageIndex].rotate
            newTempImage[state.newImageIndex].vignette_blur = (action.payload[0] === "box-shadow") ? 35 : newTempImage[state.newImageIndex].vignette_blur
            newTempImage[state.newImageIndex].vignette_spread = (action.payload[0] === "box-shadow") ? action.payload[1] : newTempImage[state.newImageIndex].vignette_spread
            newTempImage[state.newImageIndex].vignette = (action.payload[0] === "box-shadow") ? true : newTempImage[state.newImageIndex].vignette
            state.newImage = newTempImage;
        },
        cancelImageValue(state, action) {
            const newTempImage = state.newImage;
            newTempImage[state.newImageIndex].brightness = (action.payload === "brightness") ? 100 : newTempImage[state.newImageIndex].brightness
            newTempImage[state.newImageIndex].contrast = (action.payload === "contrast") ? 100 : newTempImage[state.newImageIndex].contrast
            newTempImage[state.newImageIndex].saturate = (action.payload === "saturate") ? 100 : newTempImage[state.newImageIndex].saturate
            newTempImage[state.newImageIndex].grayscale = (action.payload === "grayscale") ? 0 : newTempImage[state.newImageIndex].grayscale
            newTempImage[state.newImageIndex].sepia = (action.payload === "sepia") ? 0 : newTempImage[state.newImageIndex].sepia
            newTempImage[state.newImageIndex].hue = (action.payload === "hue-rotate") ? 0 : newTempImage[state.newImageIndex].hue
            newTempImage[state.newImageIndex].opacity = (action.payload === "opacity") ? 100 : newTempImage[state.newImageIndex].opacity
            newTempImage[state.newImageIndex].blur = (action.payload === "blur") ? 0 : newTempImage[state.newImageIndex].blur
            newTempImage[state.newImageIndex].rotate = (action.payload === "rotate") ? 0 : newTempImage[state.newImageIndex].rotate
            newTempImage[state.newImageIndex].vignette_blur = (action.payload === "box-shadow") ? 0 : newTempImage[state.newImageIndex].vignetteBlur
            newTempImage[state.newImageIndex].vignette_spread = (action.payload === "box-shadow") ? 0 : newTempImage[state.newImageIndex].vignetteSpread
            newTempImage[state.newImageIndex].vignette = (action.payload === "box-shadow") ? false : newTempImage[state.newImageIndex].vignette
            state.newImage = newTempImage;
        },
        addVignetteForNewImage(state, action) {
            const newTempImage = state.newImage;
            newTempImage[state.newImageIndex].vignette_blur = 35;
            newTempImage[state.newImageIndex].vignette = true;
            state.newImage = newTempImage;
        },
        changeNewImageTitle(state, action) {
            state.newImageTitle = action.payload;
        },
        changeNewImageBodyMessage(state, action) {
            state.newImageBodyMessage = action.payload;
        },
        setScaleReminder(state, action) {
            let scaleArray = [];
            for (let i = 0; i < state.newImage.length; i++) {
                scaleArray.push(state.newImage[i].scale);
            }

            state.scaleReminder = scaleArray;
        },
        setPostType(state, action) {
            state.postType = action.payload;
        }
    }
})

export const getNewImage = (state) => state.newImage.newImage;
export const getPostMultiple = (state) => state.newImage.postMultiple;
export const getNewImageIndex = (state) => state.newImage.newImageIndex;
export const getRotating = (state) => state.newImage.rotating
export const getFilterUsage = (state) => state.newImage.isUsingFilter;
export const getFilterClasses = (state) => state.newImage.filterClasses;
export const getNewImageTitle = (state) => state.newImage.newImageTitle;
export const getNewImageMessage = (state) => state.newImage.newImageBodyMessage;
export const getScaleReminder = (state) => state.newImage.scaleReminder;
export const getPostType = (state) => state.newImage.postType;

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
    changeFilter,
    rotateNewImage,
    manageScaleForRotatedImage,
    manageFilterUsage,
    selectFilterForNewImage,
    adjustImageValue,
    cancelImageValue,
    addVignetteForNewImage,
    changeNewImageTitle,
    changeNewImageBodyMessage,
    setScaleReminder,
    setPostType
} = newPostSlice.actions;

export default newPostSlice.reducer;
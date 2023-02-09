import { useCallback, useEffect, useState } from "react";
import { NewDisplay } from "./new-components/display-new";
import { NewGrid } from "./new-components/grid-new";
import { NewHeader } from "./new-components/header-new";
import { NewFileSelect } from "./new-components/file-select-new";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateImageUrlId } from "../../features/posts/newPostSlice";
import { useAddNewImageFileMutation, useGetImagesQuery } from "../../features/posts/imagesSclice";
const SAVE_IMG_URL = '/img/save-image';
const GET_ALL_IMG_URL = '/img/get-all-images';


export function NewPost() {
    const dispatch = useDispatch();
    const [addNewPost] = useAddNewImageFileMutation();


    const {
        data: images,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetImagesQuery();

    const [selectedImage, setSelectedImage] = useState("");
    const [allImg, setAllImg] = useState(null);

    const axiosPrivate = useAxiosPrivate();
    const { postType } = useOutletContext();

    const loadImages = useCallback(() => {
        const formData = new FormData();
        formData.append("image", selectedImage);
   
        if (selectedImage !== "") {
            const createImg = async () => {
                try {
                    const result = await addNewPost({formData});
                    if (result) {
                        console.log(result);
                        dispatch(updateImageUrlId([result.data.img_location, result.data.img_id]))
                        setSelectedImage("");   
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            createImg();
        }
    }, [axiosPrivate, selectedImage, dispatch]);

  

    useEffect(() => {
        loadImages();
    }, [loadImages])

    return (
        <div id="instaUserDashboard">
            <NewHeader postType={postType} />
            <NewDisplay />
            <NewFileSelect 
                setSelectedImage={setSelectedImage} />
            {isSuccess && <NewGrid 
                allImg={images.entities[1].images} />}
        </div>
    )
}
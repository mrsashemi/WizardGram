import { useCallback, useEffect, useState } from "react";
import { NewDisplay } from "./new-components/display-new";
import { NewGrid } from "./new-components/grid-new";
import { NewHeader } from "./new-components/header-new";
import { NewFileSelect } from "./new-components/file-select-new";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateImageUrlId } from "../../features/posts/newPostSlice";
const SAVE_IMG_URL = '/img/save-image';
const GET_ALL_IMG_URL = '/img/get-all-images';


export function NewPost() {
    const dispatch = useDispatch();

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
                    const result = await axiosPrivate.post(SAVE_IMG_URL, formData, 
                        {
                            headers: {'Content-Type': 'multipart/form-data'},
                            withCredentials: true,
                        });
                        dispatch(updateImageUrlId([result.data.img_location, result.data.img_id]))
                        setSelectedImage("");       
                } catch (error) {
                    console.error(error);
                }
            }

            createImg();
        } else {
            const getAllImg = async () => {
                try {
                    const result = await axiosPrivate.get(GET_ALL_IMG_URL, {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true,
                    });
                    setAllImg(result.data.imageList.slice(0).reverse());
                    dispatch(updateImageUrlId([result.data.imageList.slice(0).reverse()[0].img_location, result.data.imageList.slice(0).reverse()[0].img_id]));
                } catch (error) {
                    console.error(error);
                }
            }

            getAllImg();
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
            <NewGrid 
                allImg={allImg} />
        </div>
    )
}
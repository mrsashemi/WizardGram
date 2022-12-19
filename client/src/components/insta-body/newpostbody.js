import { useEffect, useState } from "react";
import { NewPostFile } from "./new-post-container/newpostfile";
import { NewPostGrid } from "./new-post-container/newpostgrid";
import { NewPostHeader } from "./new-post-container/newpostheader";
import { NewPostSelect } from "./new-post-container/newpostselect";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import { useOutletContext } from "react-router-dom";
const SAVE_IMG_URL = '/img/save-image';
const GET_ALL_IMG_URL = '/img/get-all-images';


export function NewPostBody() {
    const [selectedImage, setSelectedImage] = useState("");
    const [newImage, setNewImage] = useOutletContext();
    const [allImg, setAllImg] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
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
                        setNewImage({
                            ...newImage,
                            url: result.data.img_location,
                            id: result.data.img_id
                        })
                        setSelectedImage("");       
                } catch (error) {
                    console.error(error);
                }
            }

            createImg();
        }
    }, [selectedImage])

    useEffect(() => {
        const getAllImg = async () => {
            try {
                const result = await axiosPrivate.get(GET_ALL_IMG_URL, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                });
                setAllImg(result.data.imageList);
                setNewImage({
                    ...newImage,
                    url: result.data.imageList[0].img_location,
                    id: result.data.imageList[0].img_id
                })
            } catch (error) {
                console.error(error);
            }
        }

        getAllImg();
    }, [selectedImage])

    return (
        <div id="instaUserDashboard">
            <NewPostHeader />
            <NewPostFile 
                newImage={newImage}
                setNewImage={setNewImage} />
            <NewPostSelect 
                setSelectedImage={setSelectedImage} />
            <NewPostGrid 
                allImg={allImg}
                newImage={newImage}
                setNewImage={setNewImage} />
        </div>
    )
}
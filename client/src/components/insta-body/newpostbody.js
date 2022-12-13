import { useEffect, useState } from "react";
import { NewPostFile } from "./new-post-container/newpostfile";
import { NewPostGrid } from "./new-post-container/newpostgrid";
import { NewPostHeader } from "./new-post-container/newpostheader";
import { NewPostSelect } from "./new-post-container/newpostselect";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
const SAVE_IMG_URL = '/img/save-image'


export function NewPostBody() {
    const [selectedImage, setSelectedImage] = useState("");
    const [currentImgId, setCurrentImgId] = useState("");
    const [currentImg, setCurrentImg] = useState("");

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const formData = new FormData();
        formData.append("image", selectedImage);
   
        if (selectedImage !== "") {
            let isMounted = true;
            const controller = new AbortController();

            const createPost = async () => {
                try {
                    const result = await axiosPrivate.post(SAVE_IMG_URL, formData, 
                        {
                            headers: {'Content-Type': 'multipart/form-data'},
                            withCredentials: true,
                            signal: controller.signal
                        });
                        console.log(result.data);
                        if (isMounted) {
                            setCurrentImg(result.data.img_location);
                            setCurrentImgId(result.data.img_id);
                        }              
                } catch (error) {
                    console.error(error);
                }
            }

            createPost();
    
            return () => {
                isMounted = false;
                controller.abort();
            }
        }
    }, [selectedImage])

    return (
        <div id="instaUserDashboard">
            <NewPostHeader />
            <NewPostFile currentImg={currentImg} currentImgId={currentImgId} setCurrentImg={setCurrentImg} />
            <NewPostSelect setSelectedImage={setSelectedImage} />
            <NewPostGrid />
        </div>
    )
}
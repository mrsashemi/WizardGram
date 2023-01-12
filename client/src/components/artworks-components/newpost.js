import { useEffect, useState } from "react";
import { NewDisplay } from "./new-components/display-new";
import { NewGrid } from "./new-components/grid-new";
import { NewHeader } from "./new-components/header-new";
import { NewFileSelect } from "./new-components/file-select-new";
import useAxiosPrivate from "../../hooks/useaxiosprivate";
import { useOutletContext } from "react-router-dom";
const SAVE_IMG_URL = '/img/save-image';
const GET_ALL_IMG_URL = '/img/get-all-images';


export function NewPost() {
    const [selectedImage, setSelectedImage] = useState("");
    const [allImg, setAllImg] = useState(null);

    const axiosPrivate = useAxiosPrivate();
    const { newImage, setNewImage, postMultiple, setPostMultiple, multiples, setMultiples } = useOutletContext();

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

        const getAllImg = async () => {
            try {
                const result = await axiosPrivate.get(GET_ALL_IMG_URL, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                });
                setAllImg(result.data.imageList.slice(0).reverse());
                if (newImage) {
                    setNewImage({
                        ...newImage,
                        url: result.data.imageList.slice(0).reverse()[0].img_location,
                        id: result.data.imageList.slice(0).reverse()[0].img_id
                    })
                }
            } catch (error) {
                console.error(error);
            }
        }

        getAllImg();
    }, [selectedImage])

    useEffect(() => {
        if (postMultiple) {
            if (!multiples) setMultiples([newImage]);
        } else {
            setMultiples(null);
        }
    }, [postMultiple])

    return (
        <div id="instaUserDashboard">
            <NewHeader />
            <NewDisplay
                newImage={newImage}
                setNewImage={setNewImage} 
                postMultiple={postMultiple}
                setPostMultiple={setPostMultiple} />
            <NewFileSelect 
                setSelectedImage={setSelectedImage} />
            <NewGrid 
                allImg={allImg}
                newImage={newImage}
                setNewImage={setNewImage}
                postMultiple={postMultiple}
                setPostMultiple={setPostMultiple}
                multiples={multiples}
                setMultiples={setMultiples} />
        </div>
    )
}
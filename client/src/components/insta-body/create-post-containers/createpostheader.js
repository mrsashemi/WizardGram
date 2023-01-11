import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
const SAVE_CLASS_URL = "/classes/create-class";
const SHARE_POST_URL = "/posts/create-post"

export function CreatePostHeader({newImage, setNewImage, message}) {
    const [classId, setClassId] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [postType] = useState("fishstagram");
    const [postTitle] = useState("Fishstagram");
    const navigate = useNavigate();

    const sharePost = async () => {
        try {
            const result = await axiosPrivate.post(SAVE_CLASS_URL,
                JSON.stringify({
                    filter_class: newImage.filter, 
                    fit_class: newImage.fit, 
                    position_x: newImage.posX, 
                    position_y: newImage.posY, 
                    scale: newImage.scale, 
                    brightness: newImage.brightness, 
                    contrast: newImage.contrast, 
                    saturate: newImage.saturate, 
                    grayscale: newImage.grayscale, 
                    sepia: newImage.sepia, 
                    hue: newImage.hue, 
                    opacity: newImage.opacity, 
                    blur: newImage.blur, 
                    rotate: newImage.rotate, 
                    vignette: newImage.vignette, 
                    vignette_class: newImage.vignetteClass, 
                    vignette_blur: newImage.vignetteBlur, 
                    vignette_spread: newImage.vignetteSpread,
                    unedited: newImage.original
                }), 
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            const class_id = result.data.class_id
            setClassId(class_id);
        } catch (error) {
            if (error.response.status === 303) {
                setClassId(error.response.data.class_id);
            } else if (!error.response) {
                setErrMsg('No Server Response')
            } else if (error.response.status === 500) {
                setErrMsg("Database Error");
            } else if (error.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Failed")
            }

            console.log("sharePost", error);
        }
    }

    useEffect(() => {
        if (classId) {
            const createPost = async () => {
                try {
                    const result = await axiosPrivate.post(SHARE_POST_URL,
                        JSON.stringify({
                            post_type: postType,
                            title: postTitle,
                            body: message,
                            img_id: newImage.id,
                            class_id: classId
                        }), 
                        {
                            headers: {'Content-Type': 'application/json'},
                            withCredentials: true
                        }
                    );
        
                    console.log(result)
                    setClassId(null)
                    if (newImage) {
                        setNewImage({
                            ...newImage,
                            posX: 0,
                            posY: 0,
                            scale: 1,
                            fit: "coverImg",
                            filter: "no-filter",
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
                            vignetteClass: "vignette",
                            vignetteBlur: 0,
                            vignetteSpread: 0,
                            original: true
                        })
                    }
                    return navigate("/fishstagram")
                } catch (error) {
                    if (!error.response) {
                        setErrMsg('No Server Response')
                    } else if (error.response.status === 500) {
                        setErrMsg("Database Error");
                    } else if (error.response.status === 401) {
                        setErrMsg("Unauthorized");
                    } else {
                        setErrMsg("Failed")
                    }
        
        
                    console.log("createPost error", error);
                }
            }

            createPost();
        }
    }, [classId])


    return (
        <div className="instaUserHeader">
            <Link to='/fishstagram/editpost'>
                <button className="closeNewPost">{`<`}</button>
            </Link>
            <h2>New Post</h2>
            <button className="shareButton" onClick={sharePost}>Share</button>
        </div>
    )
}
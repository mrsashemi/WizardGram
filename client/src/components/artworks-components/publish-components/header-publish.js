import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import { getNewImage } from "../../../features/posts/newPostSlice";
const SAVE_CLASS_URL = "/classes/create-class";
const SHARE_POST_URL = "/posts/create-post"

export function PublishHeader({ message, multiples, postType, postTitle}) {
    const newImage = useSelector(getNewImage);
    const [errMsg, setErrMsg] = useState(null);
    const [multiplePosts, setMultiplePosts] = useState([]);
    const [current, setCurrent] = useState(null);
    const [postId, setPostId] = useState(null);
    const [createMultiplePost, setCreateMultiplePost] = useState(false);
    const navigate = useNavigate();

    const uploadPost = () => {
        shareMultiple();
    }

    const shareMultiple = async () => {
        for (let i = 0; i < newImage.length; i++) {
            try {
                const result = await axiosPrivate.post(SAVE_CLASS_URL,
                    JSON.stringify({
                        filter_class: newImage[i].filter_class, 
                        fit_class: newImage[i].fit_class, 
                        position_x: newImage[i].position_x, 
                        position_y: newImage[i].position_y, 
                        scale: newImage[i].scale, 
                        brightness: newImage[i].brightness, 
                        contrast: newImage[i].contrast, 
                        saturate: newImage[i].saturate, 
                        grayscale: newImage[i].grayscale, 
                        sepia: newImage[i].sepia, 
                        hue: newImage[i].hue, 
                        opacity: newImage[i].opacity, 
                        blur: newImage[i].blur, 
                        rotate: newImage[i].rotate, 
                        vignette: newImage[i].vignette, 
                        vignette_class: newImage[i].vignette_class, 
                        vignette_blur: newImage[i].vignette_blur, 
                        vignette_spread: newImage[i].vignette_spread,
                        unedited: newImage[i].original
                    }), 
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );

                const class_id = result.data.class_id
                setCurrent({id: newImage[i].id, classId: class_id});
                if (i >= newImage.length-1) return setCreateMultiplePost(true);
            } catch (error) {
                if (error.response.status === 303) {
                    const class_id = error.response.data.class_id;
                    setCurrent({id: newImage[i].id, classId: class_id});

                    if (i >= newImage.length-1) return setCreateMultiplePost(true);
                } else if (!error.response) {
                    setErrMsg('No Server Response')
                } else if (error.response.status === 500) {
                    setErrMsg("Database Error");
                } else if (error.response.status === 401) {
                    setErrMsg("Unauthorized");
                } else {
                    setErrMsg("Failed")
                }
    
                console.log("shareMultiple Error", errMsg, error);
            }
        }
    }

    useEffect(() => {
        if (current) setMultiplePosts(n => [...n, [current.id, current.classId]])
    }, [current]);

    const postMultiple = useCallback(async () => {
        try {
            const result = await axiosPrivate.post(SHARE_POST_URL,
                JSON.stringify({
                    post_type: postType,
                    title: postTitle,
                    body: message,
                    img_id: multiplePosts[0][0],
                    class_id: multiplePosts[0][1]
                }), 
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            const post_id = result.data.post_id
            setPostId(post_id);
        } catch (error) {
            let errMsg;
            if (!error.response) {
                errMsg = 'No Server Response'
            } else if (error.response.status === 500) {
                errMsg = "Database Error"
            } else if (error.response.status === 401) {
                errMsg = "Unauthorized"
            } else {
                errMsg = "failed"
            }


            console.log("createMultiple error", errMsg, error);
        }
    }, [message, multiplePosts, postTitle, postType])

    useEffect(() => {
        if (createMultiplePost) {
            setCreateMultiplePost(false);
            postMultiple();
        }
    }, [postMultiple, createMultiplePost]);

    const addMultipleToRelationalTable = useCallback(async () => {
        for (let i = 1; i < multiplePosts.length; i++) {
            try {
                const result = await axiosPrivate.post(`/posts/add-images-classes-to-post/`, 
                    JSON.stringify({
                        img_id: multiplePosts[i][0],
                        post_id: postId,
                        class_id: multiplePosts[i][1]
                    }), 
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
                console.log(result);
            } catch (error) {
                let errMsg;
                if (!error.response) errMsg = 'No Server Response'
                else if (error.response.status === 500) errMsg = "Database Error"
                else errMsg = "Failed"
                console.log("addToRelational error", errMsg, error);
            }
        }

        return navigate("/wizardgram");
    }, [multiplePosts, navigate, postId])

    useEffect(() => {
        if (postId) addMultipleToRelationalTable();
    }, [addMultipleToRelationalTable, postId])

    const returnToPreviousPage = () => {
        if (postType === "photograph") navigate('/wizardgram/editpost')
        else navigate('/wizardgram/newpost')
    }

    return (
        <div className="instaUserHeader">
            <button className="closeNewPost" onClick={returnToPreviousPage}>{`<`}</button>
            <h2>New Post</h2>
            <button className="shareButton" onClick={uploadPost}>Share</button>
        </div>
    )
}
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
const SAVE_CLASS_URL = "/classes/create-class";
const SHARE_POST_URL = "/posts/create-post"

export function PublishHeader({newImage, setNewImage, message, multiples, postType, postTitle}) {
    const [classId, setClassId] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [multiplePosts, setMultiplePosts] = useState([]);
    const [current, setCurrent] = useState(null);
    const [postId, setPostId] = useState(null);
    const [createMultiplePost, setCreateMultiplePost] = useState(false);
    const navigate = useNavigate();

    const uploadPost = () => {
        if (multiples) {
            shareMultiple();
        } else {
            sharePost();
        }
    }

    const shareMultiple = async () => {
        if (multiples) {
            for (let i = 0; i < multiples.length; i++) {
                try {
                    const result = await axiosPrivate.post(SAVE_CLASS_URL,
                        JSON.stringify({
                            filter_class: multiples[i].filter, 
                            fit_class: multiples[i].fit, 
                            position_x: multiples[i].posX, 
                            position_y: multiples[i].posY, 
                            scale: multiples[i].scale, 
                            brightness: multiples[i].brightness, 
                            contrast: multiples[i].contrast, 
                            saturate: multiples[i].saturate, 
                            grayscale: multiples[i].grayscale, 
                            sepia: multiples[i].sepia, 
                            hue: multiples[i].hue, 
                            opacity: multiples[i].opacity, 
                            blur: multiples[i].blur, 
                            rotate: multiples[i].rotate, 
                            vignette: multiples[i].vignette, 
                            vignette_class: multiples[i].vignetteClass, 
                            vignette_blur: multiples[i].vignetteBlur, 
                            vignette_spread: multiples[i].vignetteSpread,
                            unedited: multiples[i].original
                        }), 
                        {
                            headers: {'Content-Type': 'application/json'},
                            withCredentials: true
                        }
                    );

                    const class_id = result.data.class_id
                    setCurrent({id: multiples[i].id, classId: class_id});

                    if (i >= multiples.length-1) {
                        return setCreateMultiplePost(true);
                    }
                } catch (error) {
                    if (error.response.status === 303) {
                        const class_id = error.response.data.class_id;
                        setCurrent({id: multiples[i].id, classId: class_id});

                        if (i >= multiples.length-1) {
                            return setCreateMultiplePost(true);
                        }
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

                if (!error.response) {
                    errMsg = 'No Server Response'
                } else if (error.response.status === 500) {
                    errMsg = "Database Error"
                } else {
                    errMsg = "Failed"
                }
    
    
                console.log("addToRelational error", errMsg, error);
            }
        }

        return navigate("/wizardgram");
    }, [multiplePosts, navigate, postId])

    useEffect(() => {
        if (postId) {
            addMultipleToRelationalTable();
        }
    }, [addMultipleToRelationalTable, postId])

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

            console.log("sharePost error", error);
        }
    }

    const createPost = useCallback(async () => {
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
            setNewImage(n => ({
                ...n,
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
            }))
            return navigate("/wizardgram")
        } catch (error) {
            let errMsg;

            if (!error.response) {
                errMsg = 'No Server Response'
            } else if (error.response.status === 500) {
                errMsg = "Database Error"
            } else if (error.response.status === 401) {
                errMsg = "Unauthorized"
            } else {
                errMsg = "Failed"
            }


            console.log("createPost error", errMsg, error);
        }
    }, [classId, message, navigate, newImage.id, postTitle, postType, setNewImage])

    useEffect(() => {
        if (classId) createPost();
    }, [createPost, classId])

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
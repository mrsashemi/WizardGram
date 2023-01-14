import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
const SAVE_CLASS_URL = "/classes/create-class";
const SHARE_POST_URL = "/posts/create-post"

export function PublishHeader({newImage, setNewImage, message, multiples}) {
    const [classId, setClassId] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [multiplePosts, setMultiplePosts] = useState([]);
    const [current, setCurrent] = useState(null);

    const [postId, setPostId] = useState(null);
    const [createMultiplePost, setCreateMultiplePost] = useState(false);
    const [postType] = useState("fishstagram");
    const [postTitle] = useState("Fishstagram");
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
                    setCurrent({index: i, classId: class_id});

                    if (i >= multiples.length-1) {
                        return setCreateMultiplePost(true);
                    }
                } catch (error) {
                    if (error.response.status === 303) {
                        const class_id = error.response.data.class_id;
                        setCurrent({index: i, classId: class_id});

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
        
                    console.log("shareMultiple Error", error);
                }
            }
        }
    }

    useEffect(() => {
        if (current) setMultiplePosts([...multiplePosts, [multiples[current.index].id, current.classId]])
    }, [current])

    useEffect(() => {
        if (createMultiplePost && !postId) {
            const createMultiple = async () => {
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
                    return setCreateMultiplePost(false);
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
        
        
                    console.log("createMultiple error", error);
                }
            }

            createMultiple();
        } 

    }, [createMultiplePost]);

    useEffect(() => {
        if (postId) {
            const addMultipleToRelationalTable = async () => {
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
                        if (!error.response) {
                            setErrMsg('No Server Response')
                        } else if (error.response.status === 500) {
                            setErrMsg("Database Error");
                        } else {
                            setErrMsg("Failed")
                        }
            
            
                        console.log("addToRelational error", error);
                    }
                }

                return navigate("/fishstagram");
            }

            addMultipleToRelationalTable();
        }
    }, [postId])


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
            <button className="shareButton" onClick={uploadPost}>Share</button>
        </div>
    )
}
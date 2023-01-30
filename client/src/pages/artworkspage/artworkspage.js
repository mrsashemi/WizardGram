import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { SimpleBackground } from "../../components/backgrounds/background";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/artworkspage.css'
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentGrid, choosePostId, editSinglePost, expandSinglePost, getAllPosts, getAllPostsStatus, getCurrentGrid, getExpanded, selectAllPosts, selectSinglePost } from "../../features/posts/getAllPostsSlice";

export function ArtworkGallery() {
    const { id } = useParams();
    const allPosts = useSelector(selectAllPosts);
    const currentGrid = useSelector(getCurrentGrid);
    const isExpanded = useSelector(getExpanded);
    const allPostsStatus = useSelector(getAllPostsStatus);
    const dispatch = useDispatch();

    const postRef = useRef(null); 
    const navigate = useNavigate();
    const [delay, setDelay] = useState(false); // for dom effects when clicking on post to expand
    const [postMultiple, setPostMultiple] = useState(false); // for use on deciding if multiples are being posted (new post)
    const [multiples, setMultiples] = useState(null); // for use on deciding if multiples are being posted (new post)
    const [postType, setPostType] = useState(null); // for use on  deciding what type of post to make (new post)
    const [newImage, setNewImage] = useState({
        id: "",
        url: null,
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
        original: true,
        theme: "photography"
    })


    useEffect(() => {
        if (allPostsStatus === 'idle') {
            dispatch(getAllPosts(id));
        }
    }, [allPostsStatus, dispatch, id])
    
    // manage whether or not the image is untouched while editing
    useEffect(() => {
        if (newImage.filter === "no-filter" 
            && newImage.brightness === 100
            && newImage.contrast === 100
            && newImage.saturate === 100
            && newImage.grayscale === 0
            && newImage.sepia === 0
            && newImage.hue === 0
            && newImage.blur === 0
            && newImage.fit === "coverImg") {
                setNewImage(n => ({
                    ...n,
                    original: true
                }))
            } else {
                setNewImage(n => ({
                    ...n,
                    original: false
                }))
            }
    }, [
        newImage.filter, 
        newImage.brightness, 
        newImage.contrast, newImage.saturate, 
        newImage.grayscale, 
        newImage.sepia, 
        newImage.hue, 
        newImage.blur, 
        newImage.fit
    ]);


    // useEffect to create a custom delay to differentiate between the mousedown event that shrinks the posts as it is pressed and the custom longpressevents 
    // without this expand functionality automatically closes upon opening
    useEffect(() => {
        let i = 1;
        if (isExpanded) {
            let interval = setTimeout(function() {
                if (i === 2) clearTimeout(interval)
                i++
                setDelay(true)
            }, 500)
        } else {
            i = 1;
            setDelay(false)
        }

        const handleHide = (e) => {
            if (postRef.current && !postRef.current.contains(e.target)) {
                delay && contractImage();
            }
        };

        document.addEventListener('click', handleHide, true);
        return () => {
            document.removeEventListener('click', handleHide, true);
        }
    }, [delay, isExpanded]);

    // shrink expanded image
    const contractImage = () => {
        dispatch(expandSinglePost(false));
        dispatch(changeCurrentGrid(currentGrid));
        dispatch(choosePostId(null));
        setDelay(false);
    }

    // go to individual post by clicking on expanded image
    const goToPost = (id) => {
        dispatch(expandSinglePost(false));
        dispatch(editSinglePost(false));
        setDelay(false);
        return navigate(`/wizardgram/posts/${id}`)
    }

    return (
        <div>
            <SimpleBackground />
            <div id="instaGalleryContainer">
                <TopNavBar />
                <Outlet context={{
                    newImage, setNewImage, 
                    postMultiple, setPostMultiple,
                    multiples, setMultiples,
                    postType, setPostType}} />
            </div>
            {isExpanded && 
            <div className="expandedPostContainer" 
            ref={postRef} 
            key={allPosts[[...Object.keys(allPosts)]][0].post_id} 
            onClick={() => {goToPost(allPosts[[...Object.keys(allPosts)]][0].post_id)}}>
                <div className="expandedHeader">
                    <div className="individualPostProfilePic"></div>
                    <h4 className="usernameHeader">Username</h4>
                </div>
                <div className="expandedPost">
                    <img
                        alt="photography"
                        src={allPosts[[...Object.keys(allPosts)]][0].img_location} 
                        className={`expandPage ${allPosts[[...Object.keys(allPosts)]][0].filter_class} ${allPosts[[...Object.keys(allPosts)]][0].fit_class}`}
                        style={{
                            transform:  `scale(${allPosts[[...Object.keys(allPosts)]][0].scale}) 
                                        translateX(${allPosts[[...Object.keys(allPosts)]][0].position_x}%) 
                                        translateY(${allPosts[[...Object.keys(allPosts)]][0].position_y}%)
                                        rotate(${allPosts[[...Object.keys(allPosts)]][0].rotate}deg)`, 
                            opacity: `${allPosts[[...Object.keys(allPosts)]][0].opacity}%`,
                            filter: allPosts[[...Object.keys(allPosts)]][0].filter_class === "no-filter" && 
                                    `brightness(${allPosts[[...Object.keys(allPosts)]][0].brightness}%) 
                                    contrast(${allPosts[[...Object.keys(allPosts)]][0].contrast}%) 
                                    saturate(${allPosts[[...Object.keys(allPosts)]][0].saturate}%) 
                                    grayscale(${allPosts[[...Object.keys(allPosts)]][0].grayscale}%)
                                    sepia(${allPosts[[...Object.keys(allPosts)]][0].sepia}%)
                                    hue-rotate(${allPosts[[...Object.keys(allPosts)]][0].hue}deg)
                                    blur(${allPosts[[...Object.keys(allPosts)]][0].blur}px)`}}>
                    </img>
                    {
                    allPosts[[...Object.keys(allPosts)]][0].vignette &&
                    <div 
                        className="vignette" 
                        style={{boxShadow: `inset 0px 0px ${allPosts[[...Object.keys(allPosts)]][0].vignette_blur}px ${allPosts[[...Object.keys(allPosts)]][0].vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                    </div>
                    }
                </div>
            </div>}
        </div>
    )
}
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SimpleBackground } from "../../components/backgrounds/background";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/artworkspage.css'
import axios from "../../api/axios";
const GET_ALL_POSTS_URL = '/posts/get-all-fishstaposts'

export function ArtworkGallery() {
    const postRef = useRef(null); 
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [delay, setDelay] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [singlePost, setSinglePost] = useState(null);
    const [allPosts, setAllPosts] = useState(null);
    const [postMultiple, setPostMultiple] = useState(false);
    const [multiples, setMultiples] = useState(null);
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
                setNewImage({
                    ...newImage,
                    original: true
                })
            } else {
                setNewImage({
                    ...newImage,
                    original: false
                })
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

    // fetch all posts from api
    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const result = await axios.get(GET_ALL_POSTS_URL, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                });
                setAllPosts(result.data.postList.slice(0).reverse());
            } catch (error) {
                console.error(error);
            }
        }

        getAllPosts();
    }, []);

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

    // manage whether a post is being expanded or it is being directed to the scroll page
    const expandPost = (expand, index) => {
        setIsExpanded(expand)
        setSelectedIndex(index)
    }

    // shrink expanded image
    const contractImage = () => {
        setIsExpanded(false)
        setSelectedIndex(null)
        setDelay(false);
        setSinglePost(null);
    }

    // go to individual post by clicking on expanded image
    const goToPost = (id) => {
        setSinglePost(allPosts.filter(post => !post.archived)[selectedIndex]);
        setIsExpanded(false);
        setSelectedIndex(null)
        setDelay(false);
        return navigate(`/fishstagram/posts/${id}`)
    }

    return (
        <div>
            <SimpleBackground />
            <div id="instaGalleryContainer">
                <TopNavBar />
                <Outlet context={{
                    newImage, setNewImage, 
                    allPosts, setAllPosts, 
                    isExpanded, 
                    expandPost, 
                    singlePost, 
                    selectedIndex, setSelectedIndex,
                    editing, setEditing,
                    postMultiple, setPostMultiple,
                    multiples, setMultiples}} />
            </div>
            {isExpanded && 
            <div className="expandedPostContainer" 
            ref={postRef} 
            key={allPosts.filter(post => !post.archived)[selectedIndex].post_id} 
            onClick={() => {goToPost(allPosts.filter(post => !post.archived)[selectedIndex].post_id)}}>
                <div className="expandedHeader">
                    <div className="individualPostProfilePic"></div>
                    <h4 className="usernameHeader">Username</h4>
                </div>
                <div className="expandedPost">
                    <img
                        alt="photography"
                        src={allPosts.filter(post => !post.archived)[selectedIndex].img_location} 
                        className={`expandPage ${allPosts.filter(post => !post.archived)[selectedIndex].filter_class} ${allPosts.filter(post => !post.archived)[selectedIndex].fit_class}`}
                        style={{
                            transform:  `scale(${allPosts.filter(post => !post.archived)[selectedIndex].scale}) 
                                        translateX(${allPosts.filter(post => !post.archived)[selectedIndex].position_x}%) 
                                        translateY(${allPosts.filter(post => !post.archived)[selectedIndex].position_y}%)
                                        rotate(${allPosts.filter(post => !post.archived)[selectedIndex].rotate}deg)`, 
                            opacity: `${allPosts.filter(post => !post.archived)[selectedIndex].opacity}%`,
                            filter: allPosts.filter(post => !post.archived)[selectedIndex].filter_class === "no-filter" && 
                                    `brightness(${allPosts.filter(post => !post.archived)[selectedIndex].brightness}%) 
                                    contrast(${allPosts.filter(post => !post.archived)[selectedIndex].contrast}%) 
                                    saturate(${allPosts.filter(post => !post.archived)[selectedIndex].saturate}%) 
                                    grayscale(${allPosts.filter(post => !post.archived)[selectedIndex].grayscale}%)
                                    sepia(${allPosts.filter(post => !post.archived)[selectedIndex].sepia}%)
                                    hue-rotate(${allPosts.filter(post => !post.archived)[selectedIndex].hue}deg)
                                    blur(${allPosts.filter(post => !post.archived)[selectedIndex].blur}px)`}}>
                    </img>
                    {
                    allPosts.filter(post => !post.archived)[selectedIndex].vignette &&
                    <div 
                        className="vignette" 
                        style={{boxShadow: `inset 0px 0px ${allPosts.filter(post => !post.archived)[selectedIndex].vignette_blur}px ${allPosts.filter(post => !post.archived)[selectedIndex].vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                    </div>
                    }
                </div>
            </div>}
        </div>
    )
}
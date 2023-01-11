import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SimpleBackground } from "../../components/backgrounds/background";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/instagallery.css'
import axios from "../../api/axios";
const GET_ALL_POSTS_URL = '/posts/get-all-fishstaposts'

export function InstaGallery() {
    const postRef = useRef(null);
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [delay, setDelay] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [singlePost, setSinglePost] = useState(null);
    const [allPosts, setAllPosts] = useState(null);
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
        original: true
    })

    useEffect(() => {
        if (newImage.filter === "no-filter" 
            && newImage.brightness === 100
            && newImage.contrast === 100
            && newImage.saturate === 100
            && newImage.grayscale === 0
            && newImage.sepia === 0
            && newImage.hue === 0
            && newImage.blur === 0) {
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
    }, [newImage.filter, newImage.brightness, newImage.contrast, newImage.saturate, newImage.grayscale, newImage.sepia, newImage.hue, newImage.blur])

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
    }, [delay, isExpanded])

    const expandImage = (imgSrc, index) => {
        setIsExpanded(true)
        setExpandedIndex(index)
    }

    const contractImage = () => {
        setIsExpanded(false)
        setExpandedIndex(null)
        setDelay(false);
        setSinglePost(null);
    }

    const goToPost = (id) => {
        setSinglePost(allPosts[expandedIndex]);
        setIsExpanded(false);
        setExpandedIndex(null)
        setDelay(false);
        return navigate(`/fishstagram/posts/${id}`)
    }




    return (
        <div>
            <SimpleBackground />
            <div id="instaGalleryContainer">
                <TopNavBar />
                <Outlet context={[
                    newImage, setNewImage, 
                    allPosts, setAllPosts, 
                    isExpanded, 
                    expandImage, 
                    singlePost, 
                    selectedIndex, setSelectedIndex,
                    editing, setEditing]} />
            </div>
            {isExpanded && 
            <div className="expandedPostContainer" 
            ref={postRef} 
            key={allPosts[expandedIndex].post_id} 
            onClick={() => {goToPost(allPosts[expandedIndex].post_id)}}>
                <div className="expandedHeader">
                    <div className="individualPostProfilePic"></div>
                    <h4 className="usernameHeader">Username</h4>
                </div>
                <div className="expandedPost">
                    <img
                        src={allPosts[expandedIndex].img_location} 
                        className={`expandPage ${allPosts[expandedIndex].filter_class} ${allPosts[expandedIndex].fit_class}`}
                        style={{transform:  `scale(${allPosts[expandedIndex].scale}) 
                                        translateX(${allPosts[expandedIndex].position_x}%) 
                                        translateY(${allPosts[expandedIndex].position_y}%)
                                        rotate(${allPosts[expandedIndex].rotate}deg)`, 
                            opacity: `${allPosts[expandedIndex].opacity}%`,
                            filter: allPosts[expandedIndex].filter_class === "no-filter" && 
                                    `brightness(${allPosts[expandedIndex].brightness}%) 
                                    contrast(${allPosts[expandedIndex].contrast}%) 
                                    saturate(${allPosts[expandedIndex].saturate}%) 
                                    grayscale(${allPosts[expandedIndex].grayscale}%)
                                    sepia(${allPosts[expandedIndex].sepia}%)
                                    hue-rotate(${allPosts[expandedIndex].hue}deg)
                                    blur(${allPosts[expandedIndex].blur}px)`}}>
                    </img>
                    {allPosts[expandedIndex].vignette &&
                    <div className="vignette" style={{boxShadow: `inset 0px 0px ${allPosts[expandedIndex].vignette_blur}px ${allPosts[expandedIndex].vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                    </div>}
                </div>
            </div>}
        </div>
    )
}
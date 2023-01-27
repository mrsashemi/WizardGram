import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SimpleBackground } from "../../components/backgrounds/background";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/artworkspage.css'
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../features/posts/getAllPostsSlice";

export function ArtworkGallery() {
    const allPosts = useSelector(selectAllPosts);
    const postRef = useRef(null); 
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [delay, setDelay] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [singlePost, setSinglePost] = useState(null);
    const [hashMap, setHashMap] = useState(null);
    const [postMultiple, setPostMultiple] = useState(false);
    const [multiples, setMultiples] = useState(null);
    const [postType, setPostType] = useState(null);
    const [currentGrid, setCurrentGrid] = useState("artwork");
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
        setSinglePost(allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]]);
        setIsExpanded(false);
        setSelectedIndex(null)
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
                    isExpanded, 
                    expandPost, 
                    singlePost, 
                    selectedIndex, setSelectedIndex,
                    editing, setEditing,
                    postMultiple, setPostMultiple,
                    multiples, setMultiples,
                    postType, setPostType,
                    hashMap, setHashMap,
                    currentGrid, setCurrentGrid}} />
            </div>
            {isExpanded && 
            <div className="expandedPostContainer" 
            ref={postRef} 
            key={allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].post_id} 
            onClick={() => {goToPost(allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].post_id)}}>
                <div className="expandedHeader">
                    <div className="individualPostProfilePic"></div>
                    <h4 className="usernameHeader">Username</h4>
                </div>
                <div className="expandedPost">
                    <img
                        alt="photography"
                        src={allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].img_location} 
                        className={`expandPage ${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].filter_class} ${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].fit_class}`}
                        style={{
                            transform:  `scale(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].scale}) 
                                        translateX(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].position_x}%) 
                                        translateY(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].position_y}%)
                                        rotate(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].rotate}deg)`, 
                            opacity: `${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].opacity}%`,
                            filter: allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].filter_class === "no-filter" && 
                                    `brightness(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].brightness}%) 
                                    contrast(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].contrast}%) 
                                    saturate(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].saturate}%) 
                                    grayscale(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].grayscale}%)
                                    sepia(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].sepia}%)
                                    hue-rotate(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].hue}deg)
                                    blur(${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].blur}px)`}}>
                    </img>
                    {
                    allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].vignette &&
                    <div 
                        className="vignette" 
                        style={{boxShadow: `inset 0px 0px ${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].vignette_blur}px ${allPosts[[...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created))[selectedIndex]][0].vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                    </div>
                    }
                </div>
            </div>}
        </div>
    )
}
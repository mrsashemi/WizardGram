import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useLongPress from "../../../hooks/uselongpress"

export function InstaGrid({allPosts, expandImage, isExpanded, setSelectedIndex}) {
    const [imgLoc, setImgLoc] = useState(null);
    const [imgIndex, setImgIndex] = useState(null);
    const navigate = useNavigate();

    const onHover = (location, index) => {
        setImgLoc(location);
        setImgIndex(index);
    }

    const onLongPress = () => {
        if (!isExpanded) expandImage(imgLoc, imgIndex)
    }
    
    const onNormalPress = () => {
        setSelectedIndex(imgIndex);
        return navigate('/fishstagram/allposts');
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 100
    }

    const longPressEvent = useLongPress(onLongPress, onNormalPress, defaultOptions);



    return (
        <div className="instaGridContainer">
            <div className="gridSwitch">
                <button>+</button>
                <button>v</button>
                <button>o</button>
            </div>
            <div className="instaGrid">
                {allPosts && allPosts.map((post, index) => 
                    <div key={post.post_id} 
                        className="gridImageContainer" 
                        onMouseEnter={() => {onHover(post.img_location, index)}}
                        {...longPressEvent}>
                        <img
                            src={post.img_location} 
                            className={`gridPage ${post.filter_class}`}
                            style={{transform:  `scale(${post.scale}) 
                                            translateX(${post.position_x}%) 
                                            translateY(${post.position_y}%)
                                            rotate(${post.rotate}deg)`, 
                                opacity: `${post.opacity}%`,
                                filter: post.filter_class === "no-filter" && 
                                        `brightness(${post.brightness}%) 
                                        contrast(${post.contrast}%) 
                                        saturate(${post.saturate}%) 
                                        grayscale(${post.grayscale}%)
                                        sepia(${post.sepia}%)
                                        hue-rotate(${post.hue}deg)
                                        blur(${post.blur}px)`}}>
                        </img>
                        {post.vignette &&
                        <div className="vignette" style={{boxShadow: `inset 0px 0px ${post.vignette_blur/2.5}px ${post.vignette_spread/2.5}px rgba(0, 0, 0, 0.5)`}}>
                        </div>}
                    </div>
                )}
            </div>
        </div>
    )
}
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useLongPress from "../../../hooks/uselongpress"

export function InstaGrid({allPosts, expandImage, isExpanded, setSelectedIndex}) {
    const [imgLoc, setImgLoc] = useState(null);
    const [imgIndex, setImgIndex] = useState(null);
    const [imgInfo, setImgInfo] = useState(null);
    const [pressing, setPressing] = useState(false);
    const navigate = useNavigate();
    let interval;

    useEffect(() => {
        if (pressing && !isExpanded) {
            let i = 1
            let newScale = imgInfo.scale
            interval = setInterval(function() {
                if (i === 50) clearInterval(interval)
                i++;
                newScale = newScale - 0.01;
                document.getElementById(`gridimg-${imgInfo.id}`).style.transform = `scale(${newScale})`
            }, 50)
    
            return () => clearInterval(interval)
        } else if (!pressing && isExpanded) {
            document.getElementById(`gridimg-${imgInfo.id}`).style.transform = `scale(${imgInfo.scale})`
            setImgInfo(null)
            clearInterval(interval)

            return () => clearInterval(interval)
        }
    }, [pressing, isExpanded])

    const onPressingImage = (e, post) => {
        if (!isExpanded) {
            setImgInfo({id: post.post_id, scale: post.scale})
            setPressing(true)
        }
    }

    const onReleaseImage = (e, post) => {
        clearInterval(interval)
        setPressing(false)
        document.getElementById(`gridimg-${post.post_id}`).style.transform = `scale(${post.scale})`
    }

    const onHover = (location, index) => {
        setImgLoc(location);
        setImgIndex(index);
    }

    const onLongPress = () => {
        clearInterval(interval)
        setPressing(false)
        if (!isExpanded) expandImage(imgLoc, imgIndex)
    }
    
    const onNormalPress = () => {
        clearInterval(interval)
        setPressing(false)
        document.getElementById(`gridimg-${imgInfo.id}`).style.transform = `scale(${imgInfo.scale})`
        if (!isExpanded) {
            setSelectedIndex(imgIndex);
            return navigate('/fishstagram/allposts');
        }
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 750
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
                {allPosts && allPosts.filter(post => post.archived === false).map((post, index) => 
                    <div key={post.post_id} 
                    className="gridImageContainer" 
                    onMouseEnter={() => {onHover(post.img_location, index)}}
                    {...longPressEvent}>
                        <img
                        onMouseDown={(e) => {onPressingImage(e, post)}}
                        onMouseUp={(e) => {onReleaseImage(e, post)}}
                        src={post.img_location}
                        id={`gridimg-${post.post_id}`} 
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
                        <div 
                        onMouseDown={(e) => {onPressingImage(e, post)}}
                        onMouseUp={(e) => {onReleaseImage(e, post)}}
                        className="vignette" style={{boxShadow: `inset 0px 0px ${post.vignette_blur/2.5}px ${post.vignette_spread/2.5}px rgba(0, 0, 0, 0.5)`}}>
                        </div>}
                    </div>
                )}
            </div>
        </div>
    )
}
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useLongPress from "../../../hooks/uselongpress"

export function ArtworksHomeGrid({allPosts, expandPost, isExpanded}) {
    const [imgIndex, setImgIndex] = useState(null);
    const [imgInfo, setImgInfo] = useState(null);
    const [pressing, setPressing] = useState(false);
    const navigate = useNavigate();
    let interval = useRef();

    // simulate pressing shrinking effect on post with intervals
    useEffect(() => {
        if (pressing && !isExpanded) {
            let i = 1;
            let newScale = imgInfo.scale;
            interval.current = setInterval(function() {
                if (i === 50) {
                    clearInterval(interval.current);
                    document.getElementById(`gridimg-${imgInfo.id}`).style.transform = `scale(${imgInfo.scale})`;
                };
                i++;
                newScale = newScale - 0.01;
                document.getElementById(`gridimg-${imgInfo.id}`).style.transform = `scale(${newScale})`;
            }, 50);
        } else if (!pressing && isExpanded) {
            document.getElementById(`gridimg-${imgInfo.id}`).style.transform = `scale(${imgInfo.scale})`;
            setImgInfo(null);
            clearInterval(interval.current);
        }
    }, [pressing, isExpanded]);

    // onMouseDown to begin interval
    const onPressingImage = (e, post) => {
        e.preventDefault();

        if (!isExpanded) {
            setImgInfo({id: post.post_id, scale: post.scale});
            setPressing(true);
        };
    }

    // onMouseUp to end interval
    const onReleaseImage = (e, post) => {
        e.preventDefault();

        clearInterval(interval.current);
        setPressing(false);
        document.getElementById(`gridimg-${post.post_id}`).style.transform = `scale(${post.scale})`;
    };

    // onMouseOver to find id/index of post prior to beginning next event
    const onHover = (index) => {
        setImgIndex(index);
    };

    // Using custom event hook, a longer click will expand the post to a large view
    const onLongPress = () => {
        setPressing(false);
        if (!isExpanded) expandPost(true, imgIndex);
    };

    // Custom hook also takes normal click to proceed to the scroll page
    const onNormalPress = () => {
        setPressing(false);
        document.getElementById(`gridimg-${imgInfo.id}`).style.transform = `scale(${imgInfo.scale})`;
        if (!isExpanded) {
            expandPost(false, imgIndex);
            return navigate('/fishstagram/allposts');
        };
    };
    
    // Custom hook options to set preferred delay
    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 750
    };

    const longPressEvent = useLongPress(onLongPress, onNormalPress, defaultOptions);

    return (
        <div className="instaGridContainer">
            <div className="gridSwitch">
                <button>photography</button>
                <button>artworks</button>
                <button>generative</button>
            </div>
            <div className="instaGrid">
                {
                allPosts && allPosts.filter(post => post.archived === false).map((post, index) => 
                    <div 
                        key={post.post_id} 
                        className="gridImageContainer" 
                        onMouseEnter={() => {onHover(index)}}
                        {...longPressEvent}>
                        <img
                            alt="photography"
                            onMouseDown={(e) => {onPressingImage(e, post)}}
                            onMouseUp={(e) => {onReleaseImage(e, post)}}
                            src={post.img_location}
                            id={`gridimg-${post.post_id}`} 
                            className={`gridPage ${post.filter_class}`}
                            style={{
                                transform: `scale(${post.scale}) 
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
                                        blur(${post.blur}px)`}} >
                        </img>
                        {
                        post.vignette &&
                        <div 
                            onMouseDown={(e) => {onPressingImage(e, post)}}
                            onMouseUp={(e) => {onReleaseImage(e, post)}}
                            className="vignette" 
                            style={{
                                boxShadow: `inset 0px 0px ${post.vignette_blur/2.5}px ${post.vignette_spread/2.5}px rgba(0, 0, 0, 0.5)`}} >
                        </div>
                        }
                    </div>)
                }
            </div>
        </div>
    )
}
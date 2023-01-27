import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { selectAllPosts, getAllPostsStatus } from "../../../features/posts/getAllPostsSlice";
import { useNavigate } from "react-router-dom"
import useLongPress from "../../../hooks/uselongpress"

export function ArtworksHomeGrid({expandPost, isExpanded, currentGrid, setCurrentGrid}) {
    const [imgIndex, setImgIndex] = useState(null);
    const [pressing, setPressing] = useState(false);
    const navigate = useNavigate();
    const imgInfo = useRef(null);
    let interval = useRef();

    const allPosts = useSelector(selectAllPosts);
    const allPostsStatus = useSelector(getAllPostsStatus);


    // simulate pressing shrinking effect on post with intervals
    useEffect(() => {
        if (pressing && !isExpanded) {
            let i = 1;
            let newScale = imgInfo.current.scale;
            interval.current = setInterval(function() {
                if (i === 50) {
                    clearInterval(interval.current);
                    document.getElementById(`gridimg-${imgInfo.current.id}`).style.transform = `scale(${imgInfo.current.scale})`;
                };
                i++;
                newScale = newScale - 0.01;
                document.getElementById(`gridimg-${imgInfo.current.id}`).style.transform = `scale(${newScale})`;
            }, 50);
        } else if (!pressing && isExpanded) {
            document.getElementById(`gridimg-${imgInfo.current.id}`).style.transform = `scale(${imgInfo.current.scale})`;
            imgInfo.current = null;
            clearInterval(interval.current);
        }
    }, [pressing, isExpanded]);

    // onMouseDown to begin interval
    const onPressingImage = (e, post) => {
        e.preventDefault();

        if (!isExpanded) {
            imgInfo.current = {id: post.post_id, scale: post.scale}
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
        document.getElementById(`gridimg-${imgInfo.current.id}`).style.transform = `scale(${imgInfo.current.scale})`;
        if (!isExpanded) {
            expandPost(false, imgIndex);
            return navigate('/wizardgram/allposts');
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
                <button onClick={() => {setCurrentGrid("artwork")}}>artworks</button>
                <button onClick={() => {setCurrentGrid("photograph")}}>photography</button>
                <button onClick={() => {setCurrentGrid("generative")}}>generative</button>
            </div>
            <div className="instaGrid">
                {
                allPosts && [...Object.keys(allPosts)].filter(k => allPosts[k][0].archived === false && allPosts[k][0].post_type === currentGrid).sort((x, y) =>  new Date(allPosts[y][0].date_created) - new Date(allPosts[x][0].date_created)).map((k, index) => 
                    <div 
                        key={allPosts[k][0].post_id} 
                        className="gridImageContainer" 
                        onMouseEnter={() => {onHover(index)}}
                        {...longPressEvent}>
                        <img
                            alt="photography"
                            onMouseDown={(e) => {onPressingImage(e, allPosts[k][0])}}
                            onMouseUp={(e) => {onReleaseImage(e, allPosts[k][0])}}
                            src={allPosts[k][0].img_location}
                            id={`gridimg-${allPosts[k][0].post_id}`} 
                            className={`gridPage ${allPosts[k][0].filter_class}`}
                            style={{
                                transform: `scale(${allPosts[k][0].scale}) 
                                            translateX(${allPosts[k][0].position_x}%) 
                                            translateY(${allPosts[k][0].position_y}%)
                                            rotate(${allPosts[k][0].rotate}deg)`, 
                                opacity: `${allPosts[k][0].opacity}%`,
                                filter: allPosts[k][0].filter_class === "no-filter" && 
                                        `brightness(${allPosts[k][0].brightness}%) 
                                        contrast(${allPosts[k][0].contrast}%) 
                                        saturate(${allPosts[k][0].saturate}%) 
                                        grayscale(${allPosts[k][0].grayscale}%)
                                        sepia(${allPosts[k][0].sepia}%)
                                        hue-rotate(${allPosts[k][0].hue}deg)
                                        blur(${allPosts[k][0].blur}px)`}} >
                        </img>
                        {
                        allPosts[k][0].vignette &&
                        <div 
                            onMouseDown={(e) => {onPressingImage(e, allPosts[k][0])}}
                            onMouseUp={(e) => {onReleaseImage(e, allPosts[k][0])}}
                            className="vignette" 
                            style={{
                                boxShadow: `inset 0px 0px ${allPosts[k][0].vignette_blur/2.5}px ${allPosts[k][0].vignette_spread/2.5}px rgba(0, 0, 0, 0.5)`}} >
                        </div>
                        }
                    </div>)
                }
            </div>
        </div>
    )
}

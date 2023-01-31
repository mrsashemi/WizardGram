import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ImgContainer } from "../img-component/img-container.js"
import { selectAllPosts, getAllPostsStatus, changeCurrentGrid, getExpanded, expandSinglePost, getPostId, choosePostId, selectSinglePost, useGetPostsQuery, selectAllPost, selectPostById, selectUserIds } from "../../../features/posts/getAllPostsSlice";
import { useNavigate } from "react-router-dom"
import useLongPress from "../../../hooks/uselongpress"


export function ArtworksHomeGrid() {
    const [pressing, setPressing] = useState(false);
    const navigate = useNavigate();
    const imgInfo = useRef(null);
    let interval = useRef();

    const allPost = useSelector(selectAllPost);
    const allPosts = useSelector(selectAllPosts);
    const isExpanded = useSelector(getExpanded);
    const selectedPostId = useSelector(getPostId);
    //const allPostsStatus = useSelector(getAllPostsStatus);
    const dispatch = useDispatch();

    const {
        data: post,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()


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
    const onHover = (postid) => {
        dispatch(choosePostId(postid));
    };

    // Using custom event hook, a longer click will expand the post to a large view
    const onLongPress = () => {
        setPressing(false);
        if (!isExpanded) {
            dispatch(expandSinglePost(true));
            dispatch(selectSinglePost(selectedPostId));
        } 
    };

    // Custom hook also takes normal click to proceed to the scroll page
    const onNormalPress = () => {
        setPressing(false);
        document.getElementById(`gridimg-${imgInfo.current.id}`).style.transform = `scale(${imgInfo.current.scale})`;
        if (!isExpanded) {
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
                <button onClick={() => {dispatch(changeCurrentGrid("artwork"))}}>artworks</button>
                <button onClick={() => {dispatch(changeCurrentGrid("photograph"))}}>photography</button>
                <button onClick={() => {dispatch(changeCurrentGrid("generative"))}}>generative</button>
            </div>
            <div className="instaGrid">
                {
                allPosts && [...Object.keys(allPosts)].reverse().map((k, index) => 
                    <div 
                        key={allPosts[k][0].post_id} 
                        className="gridImageContainer" 
                        onMouseEnter={() => {onHover(allPosts[k][0].post_id)}}
                        {...longPressEvent}>
                            <ImgContainer post={allPosts[k][0]} imgClass={'scrollPage'} render={(selected) => (
                                selected.vignette ? (
                                    <div className="vignette" style={{boxShadow: `inset 0px 0px ${selected.vignette_blur/2.5}px ${selected.vignette_spread/2.5}px rgba(0, 0, 0, 0.5)`}}></div>
                                ) : (
                                    <div className="floater" onMouseDown={(e) => {onPressingImage(e, selected)}} onMouseUp={(e) => {onReleaseImage(e, selected)}}></div>
                                )
                            )}/> 
                    </div>)
                }
            </div>
        </div>
    )
}

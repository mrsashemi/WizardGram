import { useDispatch, useSelector } from "react-redux";
import { changePostMessage, selectAllPosts } from "../../../features/posts/getAllPostsSlice";

export function SingleModify() {
    const allPosts = useSelector(selectAllPosts);
    const dispatch = useDispatch();

    const handleMessageChange = (e) => {
        dispatch(changePostMessage(e.target.value));
    }
    
    return (
        <div className="instaScroll">
            <div key={allPosts[[...Object.keys(allPosts)]][0].postId} className='scrollPostContainer'>
                <div  className="individualPostHeader">
                    <div className="individualPostProfile">
                        <div className="individualPostProfilePic"></div>
                        <h4 className="usernameHeader">Username</h4>
                    </div>
                    <button className="editPost">...</button>
                </div>
                <div className="scrollImageContainer">
                    <img 
                            src={allPosts[[...Object.keys(allPosts)]][0].img_location} 
                            className={`scrollPage ${allPosts[[...Object.keys(allPosts)]][0].filter_class} ${allPosts[[...Object.keys(allPosts)]][0].fit_class}`}
                            style={{transform:  `scale(${allPosts[[...Object.keys(allPosts)]][0].scale}) 
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
                        {allPosts[[...Object.keys(allPosts)]][0].vignette &&
                        <div className="vignette" style={{boxShadow: `inset 0px 0px ${allPosts[[...Object.keys(allPosts)]][0].vignette_blur}px ${allPosts[[...Object.keys(allPosts)]][0].vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                        </div>}
                </div>
                <div className="scrollPostLikesAndComment">
                    <div className="postCommentEdit">
                        <textarea className="postCommentBody" onChange={handleMessageChange} defaultValue={allPosts[[...Object.keys(allPosts)]][0].body}></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}
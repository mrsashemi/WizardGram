import { useEffect, useRef } from "react";

export function AllPostsScroll({allPosts, selectedIndex, onShow, setPostIndex, setSelectedIndex}) {
    const selectedRef = useRef(null);

    const scrollToPost = (e, index) => {
        if (index === selectedIndex) e.target.scrollIntoView();
    }

    const openModal = (postId, postIndex) => {
        setSelectedIndex(postIndex);
        setPostIndex({id: postId, index: postIndex});
        onShow();
    } 

    return (
        <div className="instaScroll">
            {allPosts && allPosts.map((post, index) => 
                <div 
                key={post.post_id} 
                className='scrollPostContainer'
                id={index}
                onLoad={(e) => {scrollToPost(e, index)}}>
                    <div  className="individualPostHeader">
                        <div className="individualPostProfile">
                            <div className="individualPostProfilePic"></div>
                            <h4 className="usernameHeader">Username</h4>
                        </div>
                        <button className="editPost" onClick={() => {openModal(post.post_id, index)}}>...</button>
                    </div>
                    <div className="scrollImageContainer">
                        <img 
                                src={post.img_location} 
                                className={`scrollPage ${post.filter_class} ${post.fit_class}`}
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
                            <div className="vignette" style={{boxShadow: `inset 0px 0px ${post.vignette_blur}px ${post.vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                            </div>}
                    </div>
                    <div className="scrollPostLikesAndComment">
                        <div className="postLikes">
                            <button>Heart</button>
                            <div>100 Likes</div>
                        </div>
                        {post.body && <div className="postComment">
                            <h4 className="usernameHeader">Username</h4>
                            <p className="usernameHeader">{post.body}</p>
                        </div>}
                    </div>
                </div>
            )}
        </div>
    )
}
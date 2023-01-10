export function EditSinglePost({post, setMessage, message}) {
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        console.log(e.target.value);
    }
    
    return (
        <div className="instaScroll">
            <div key={post.postId} className='scrollPostContainer'>
                <div  className="individualPostHeader">
                    <div className="individualPostProfile">
                        <div className="individualPostProfilePic"></div>
                        <h4 className="usernameHeader">Username</h4>
                    </div>
                    <button className="editPost">...</button>
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
                    <div className="postComment">
                        <textarea onChange={handleMessageChange}>{message}</textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}
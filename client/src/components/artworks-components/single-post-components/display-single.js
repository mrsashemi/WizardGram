import axios from "../../../api/axios";
import { PostSlider } from "../sliders/post-slider";

export function SingleDisplay({post, onShow, setPostId, setSelectedIndex, hashMap, setHashMap}) {
    const openModal = (postId, postIndex) => {
        setSelectedIndex(postIndex); 
        setPostId(postId);
        onShow();
    } 

    const incrementLikes = async (e, index, post) => {
        try {
            const result = await axios.put(`/posts/update-post/${post.post_id}`, 
                JSON.stringify({
                    body: post.body,
                    theme_id: post.theme_id,
                    title: post.title,
                    date_updated: post.date_updated,
                    likes: (e.target.style.background === 'white') ? post.likes+1 : post.likes-1,
                    show_likes: post.show_likes,
                    archived: post.archived
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(result)
            if (result) {
                let tempArray = hashMap.get(post.post_id);
                tempArray[0].likes = (e.target.style.background === 'white') ? post.likes+1 : post.likes-1;
                e.target.style.background = (e.target.style.background === 'white') ? 'red' : 'white';
                setHashMap(new Map(hashMap.set(post.post_id, tempArray)));
            }
        } catch (error) {
            console.log("updatePost", error);
        }
    }
    
    return (
        <div className="instaScroll">
            <div key={post.postId} className='scrollPostContainer'>
                <div  className="individualPostHeader">
                    <div className="individualPostProfile">
                        <div className="individualPostProfilePic"></div>
                        <h4 className="usernameHeader">Username</h4>
                    </div>
                    <button className="editPost" onClick={() => {openModal(post[0].post_id, [...hashMap.keys()].indexOf(post[0].post_id))}}>...</button>
                </div>
                {post.length > 1 ? 
                <PostSlider multiples={post} existing={true} />
                :
                <div className="scrollImageContainer">
                    <img 
                            alt="photography"
                            src={post[0].img_location} 
                            className={`scrollPage ${post[0].filter_class} ${post[0].fit_class}`}
                            style={{transform:  `scale(${post[0].scale}) 
                                            translateX(${post[0].position_x}%) 
                                            translateY(${post[0].position_y}%)
                                            rotate(${post[0].rotate}deg)`, 
                                opacity: `${post[0].opacity}%`,
                                filter: post[0].filter_class === "no-filter" && 
                                        `brightness(${post[0].brightness}%) 
                                        contrast(${post[0].contrast}%) 
                                        saturate(${post[0].saturate}%) 
                                        grayscale(${post[0].grayscale}%)
                                        sepia(${post[0].sepia}%)
                                        hue-rotate(${post[0].hue}deg)
                                        blur(${post[0].blur}px)`}}>
                        </img>
                        {post[0].vignette &&
                        <div className="vignette" style={{boxShadow: `inset 0px 0px ${post[0].vignette_blur}px ${post[0].vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                        </div>}
                </div>
                }
                <div className="scrollPostLikesAndComment">
                    {post[0].show_likes && <div className="postLikes">
                        <button style={{background: `white`}} onClick={(e) => {incrementLikes(e, [...hashMap.keys()].indexOf(post[0].post_id), post[0])}}>Heart</button>
                        <div>{post[0].likes} Likes</div>
                    </div>}
                    {post[0].body && <div className="postComment">
                        <h4 className="usernameHeader">Username</h4>
                        <p className="usernameHeader">{post[0].body}</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}
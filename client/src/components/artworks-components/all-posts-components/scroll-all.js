import axios from "../../../api/axios";
import { incrementPostLikes, decrementPostLikes, selectAllPosts, getPostId, choosePostId } from "../../../features/posts/getAllPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PostSlider } from "../sliders/post-slider";
import { ImgContainer } from "../img-component/img-container";

export function AllScroll({onShow}) {  
    const allPosts = useSelector(selectAllPosts);
    const selectedId = useSelector(getPostId);
    const dispatch = useDispatch();
    
    
    // scroll to selected post upon loading page
    const scrollToPost = (e, id) => {
        if (id === selectedId) e.target.scrollIntoView();
    }

    // open the modify post modal
    const openModal = (postId) => {
        dispatch(choosePostId(postId));
        onShow();
    } 

    // call updatePost controller to increment likes
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

            if (result) {
                (e.target.style.background === 'white') ? dispatch(incrementPostLikes(post.post_id)) : dispatch(decrementPostLikes(post.post_id));
                e.target.style.background = (e.target.style.background === 'white') ? 'red' : 'white';
            }
        } catch (error) {
            console.log("updatePost", error);
        }
    }

    return (
        <div className="instaScroll">
            {allPosts && [...Object.keys(allPosts)].map((k, index) => 
                <div 
                key={allPosts[k][0].post_id} 
                className='scrollPostContainer'
                id={index}
                onLoad={(e) => {scrollToPost(e, allPosts[k][0].post_id)}}>
                    <div  className="individualPostHeader">
                        <div className="individualPostProfile">
                            <div className="individualPostProfilePic"></div>
                            <h4 className="usernameHeader">Username</h4>
                        </div>
                        <button className="editPost" onClick={() => {openModal(allPosts[k][0].post_id)}}>...</button>
                    </div>
                    {allPosts[k].length > 1 ?
                    <PostSlider multiples={allPosts[k]} existing={true} />
                    :
                    <div className="scrollImageContainer">
                        <ImgContainer post={allPosts[k][0]} imgClass={'scrollPage'} render={(selected) => (
                                selected.vignette && (
                                    <div className="vignette" style={{boxShadow: `inset 0px 0px ${selected.vignette_blur}px ${selected.vignette_spread}px rgba(0, 0, 0, 0.5)`}}></div>
                                ) 
                        )}/> 
                    </div>
                    }               
                    <div className="scrollPostLikesAndComment">
                        {allPosts[k][0].show_likes && <div className="postLikes">
                            <button style={{background: `white`}} onClick={(e) => {incrementLikes(e, index, allPosts[k][0])}}>Heart</button>
                            <div>{allPosts[k][0].likes} likes</div>
                        </div>}
                        {allPosts[k][0].body && <div className="postComment">
                            <h4 className="usernameHeader">Username</h4>
                            <p className="usernameHeader">{allPosts[k][0].body}</p>
                        </div>}
                    </div>
                </div>
            )}
        </div>
    )
}
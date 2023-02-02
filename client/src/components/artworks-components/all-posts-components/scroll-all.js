import { getPostId, choosePostId, useUpdatePostMutation } from "../../../features/posts/getAllPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PostSlider } from "../sliders/post-slider";
import { ImgContainer } from "../img-component/img-container";

export function AllScroll({onShow, posts, currentGrid}) {  
    const [updatePost] = useUpdatePostMutation();
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
            const result = await updatePost({
                update: {
                    prop: "likes",
                    val: (e.target.style.background === 'white') ? post.likes + 1 : post.likes - 1,
                    date: post.date_updated,
                    post: post
                }
            })

            if (result) {
                e.target.style.background = (e.target.style.background === 'white') ? 'red' : 'white'
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="instaScroll">
            {posts && [...Object.keys(posts)]
                .filter(k => posts[k].post[0].archived === false && posts[k].post[0].post_type === currentGrid)
                .sort((x,y) => new Date(posts[y].post[0].date_created) - new Date(posts[x].post[0].date_created))
                .map((k, index) => 
                <div 
                key={posts[k].post[0].post_id} 
                className='scrollPostContainer'
                id={index}
                onLoad={(e) => {scrollToPost(e, posts[k].post[0].post_id)}}>
                    <div  className="individualPostHeader">
                        <div className="individualPostProfile">
                            <div className="individualPostProfilePic"></div>
                            <h4 className="usernameHeader">Username</h4>
                        </div>
                        <button className="editPost" onClick={() => {openModal(posts[k].post[0].post_id)}}>...</button>
                    </div>
                    {posts[k].post.length > 1 ?
                    <PostSlider multiples={posts[k].post} existing={true} />
                    :
                    <div className="scrollImageContainer">
                        <ImgContainer post={posts[k].post[0]} imgClass={'scrollPage'} render={(selected) => (
                                selected.vignette && (
                                    <div className="vignette" style={{boxShadow: `inset 0px 0px ${selected.vignette_blur}px ${selected.vignette_spread}px rgba(0, 0, 0, 0.5)`}}></div>
                                ) 
                        )}/> 
                    </div>
                    }               
                    <div className="scrollPostLikesAndComment">
                        {posts[k].post[0].show_likes && <div className="postLikes">
                            <button style={{background: `white`}} onClick={(e) => {incrementLikes(e, index, posts[k].post[0])}}>Heart</button>
                            <div>{posts[k].post[0].likes} likes</div>
                        </div>}
                        {posts[k].post[0].body && <div className="postComment">
                            <h4 className="usernameHeader">Username</h4>
                            <p className="usernameHeader">{posts[k].post[0].body}</p>
                        </div>}
                    </div>
                </div>
            )}
        </div>
    )
}
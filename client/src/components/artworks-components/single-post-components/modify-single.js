import { useDispatch } from "react-redux";
import { changePostMessage } from "../../../features/posts/getAllPostsSlice";
import { ImgContainer } from "../img-component/img-container";

export function SingleModify({posts, id}) {
    const dispatch = useDispatch();

    const handleMessageChange = (e) => {
        dispatch(changePostMessage(e.target.value));
    }
    
    return (
        <div className="instaScroll">
            <div key={posts[id].post[0].postId} className='scrollPostContainer'>
                <div  className="individualPostHeader">
                    <div className="individualPostProfile">
                        <div className="individualPostProfilePic"></div>
                        <h4 className="usernameHeader">Username</h4>
                    </div>
                    <button className="editPost">...</button>
                </div>
                <div className="scrollImageContainer">
                    <ImgContainer post={posts[id].post[0]} imgClass={'scrollPage'} render={(selected) => (
                            selected.vignette && (
                                <div className="vignette" style={{boxShadow: `inset 0px 0px ${selected.vignette_blur}px ${selected.vignette_spread}px rgba(0, 0, 0, 0.5)`}}></div>
                            ) 
                    )}/>
                </div>
                <div className="scrollPostLikesAndComment">
                    <div className="postCommentEdit">
                        <textarea className="postCommentBody" onChange={handleMessageChange} defaultValue={posts[id].post[0].body}></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}
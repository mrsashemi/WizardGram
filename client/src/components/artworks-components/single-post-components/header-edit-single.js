import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { editSinglePost, getPostMessage, useUpdatePostMutation } from "../../../features/posts/getAllPostsSlice";

export function SingleEditHeader({posts, id}) {
    const [updatePost] = useUpdatePostMutation();
    const message = useSelector(getPostMessage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cancelEdit = () => {
        dispatch(editSinglePost(false));
        return navigate(-1)
    }

    const updatePostBody = async () => {
        const time = new Date().toISOString();

        try {
            const result = await updatePost({
                update: {
                    prop: "body",
                    val: message,
                    date: time,
                    post: posts[id].post[0]
                }
            })

            if (result) {
                dispatch(editSinglePost(false));
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="instaUserHeader">
            <div className="headerButtons">
                    <button className="postButton" onClick={() => cancelEdit()}>Cancel</button>
            </div>
            <div className="postsUserHeader">
                <h3 className="usernameHeader">Edit info</h3>
            </div>
            <button className="editButton" onClick={() => {updatePostBody()}}>Done</button>
        </div>
    )
}
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { axiosPrivate } from "../../../api/axios";
import { editPostBody, editSinglePost, getPostMessage, selectAllPosts } from "../../../features/posts/getAllPostsSlice";

export function SingleEditHeader() {
    const allPosts = useSelector(selectAllPosts);
    const message = useSelector(getPostMessage);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState(null);

    const cancelEdit = () => {
        dispatch(editSinglePost(false));
        return navigate(-1)
    }

    const updatePostBody = async () => {
        const time = new Date().toISOString();

        try {
            const result = await axiosPrivate.put(`/posts/update-post/${allPosts[[...Object.keys(allPosts)]][0].post_id}`, 
                JSON.stringify({
                    body: message,
                    theme_id: allPosts[[...Object.keys(allPosts)]][0].theme_id,
                    title: allPosts[[...Object.keys(allPosts)]][0].title,
                    date_updated: time,
                    likes: allPosts[[...Object.keys(allPosts)]][0].likes,
                    show_likes: allPosts[[...Object.keys(allPosts)]][0].show_likes,
                    archived: allPosts[[...Object.keys(allPosts)]][0].archived
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            if (result) {
                dispatch(editPostBody([allPosts[[...Object.keys(allPosts)]][0].post_id, message]));
                dispatch(editSinglePost(false));
            }
        } catch (error) {
            if (error.response.status === 500) {
                setErrMsg("Database Error"); 
            } else if (error.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Failed")
            }

            console.log("updatePost", errMsg, error);
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
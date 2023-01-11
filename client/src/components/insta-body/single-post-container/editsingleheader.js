import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { axiosPrivate } from "../../../api/axios";

export function EditSingleHeader({post, message, allPosts, setAllPosts, selectedIndex}) {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState(null);

    const cancelEdit = () => {
        return navigate(-1)
    }

    const updatePostBody = async () => {
        const time = new Date().toISOString();

        try {
            const result = await axiosPrivate.put(`/posts/update-post/${post.post_id}`, 
                JSON.stringify({
                    body: message,
                    theme_id: post.theme_id,
                    title: post.title,
                    date_updated: time,
                    likes: post.likes,
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
                let tempPostsArray = allPosts.slice();
                tempPostsArray[selectedIndex].body = message;
                setAllPosts(tempPostsArray);
                return navigate(-1)
            }
        } catch (error) {
            if (error.response.status === 500) {
                setErrMsg("Database Error");
            } else if (error.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Failed")
            }

            console.log("updatePost", error);
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
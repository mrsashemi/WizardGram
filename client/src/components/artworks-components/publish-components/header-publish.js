import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "../../../features/posts/getAllPostsSlice";
import { getNewImage, getNewImageMessage, getNewImageTitle, getPostType } from "../../../features/posts/newPostSlice";


export function PublishHeader() {
    const [addNewPost] = useAddNewPostMutation();
    const message = useSelector(getNewImageMessage);
    const postTitle = useSelector(getNewImageTitle);
    const newImage = useSelector(getNewImage);
    const postType = useSelector(getPostType);
    const navigate = useNavigate();

    const uploadPost = async () => {
        try {
            const result = await addNewPost({
                newPost: {
                    newImage: newImage,
                    post: {
                        postType: postType,
                        postTitle: postTitle,
                        message: message
                    }
                }
            })
    
            if (result) navigate('/wizardgram');
        } catch (error) {
            console.log(error);
        }
    }

    const returnToPreviousPage = () => {
        if (postType === "photograph") navigate('/wizardgram/editpost')
        else navigate('/wizardgram/newpost')
    }

    return (
        <div className="instaUserHeader">
            <button className="closeNewPost" onClick={returnToPreviousPage}>{`<`}</button>
            <h2>New Post</h2>
            <button className="shareButton" onClick={uploadPost}>Share</button>
        </div>
    )
}
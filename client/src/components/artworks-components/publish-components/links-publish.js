import { useDispatch, useSelector } from "react-redux";
import { changeNewImageTitle, getNewImageTitle } from "../../../features/posts/newPostSlice";


export function PublishLinks() {
    const postTitle = useSelector(getNewImageTitle);
    const dispatch = useDispatch();

    const handleTitleChange = (e) => {
        dispatch(changeNewImageTitle(e.target.value));
    }

    return (
        <div className="createPostLinksContainer">
            <div>
                <label>Title:</label>
                <textarea className="titleBox" placeholder={postTitle} onChange={handleTitleChange}></textarea>
            </div>
        </div>
    )
}
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeImageIndex, getNewImage, resetImages } from "../../../features/posts/newPostSlice";

export function EditHeader() {
    const navigate = useNavigate();
    const newImage = useSelector(getNewImage);
    const dispatch = useDispatch();

    const toPostSelect = () => {
        if (newImage) dispatch(resetImages());
        return navigate('/wizardgram/newpost');
    }

    const toPostPublish = () => {
        dispatch(changeImageIndex(0));
        return navigate('/wizardgram/createpost')
    }

    return (
        <div className="instaUserHeader">
            <button className="closeNewPost" onClick={() => toPostSelect()}>{`<`}</button>
            <h2>Edit Post</h2>
            <button className="nextButton" onClick={() => toPostPublish()}>Next</button>
        </div>
    )
}
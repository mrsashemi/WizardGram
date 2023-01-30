import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getNewImage, resetImages } from "../../../features/posts/newPostSlice";

export function EditHeader() {
    const navigate = useNavigate();
    const newImage = useSelector(getNewImage);
    const dispatch = useDispatch();

    const toPostSelect = () => {
        if (newImage) dispatch(resetImages());
        return navigate('/wizardgram/newpost');
    }

    return (
        <div className="instaUserHeader">
            <button className="closeNewPost" onClick={() => toPostSelect()}>{`<`}</button>
            <h2>Edit Post</h2>
            <Link to='/wizardgram/createpost'>
                <button className="nextButton">Next</button>
            </Link>
        </div>
    )
}
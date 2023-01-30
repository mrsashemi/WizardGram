import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeImageIndex } from "../../../features/posts/newPostSlice";

export function NewHeader({postType}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toNextPage = () => {
        if (postType === "photograph") {
            dispatch(changeImageIndex(0));
            navigate("/wizardgram/editpost")
        } else {
            navigate("/wizardgram/createpost")
        }
    }

    return (
        <div className="instaUserHeader">
            <Link to='/wizardgram'>
                <button className="closeNewPost">X</button>
            </Link>
            <h2>New Post</h2>
            <button className="nextButton" onClick={toNextPage}>Next</button>
        </div>
    )
}
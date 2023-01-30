import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeCurrentGrid, getCurrentGrid } from "../../../features/posts/getAllPostsSlice";

export function AllHeader() {
    const currentGrid = useSelector(getCurrentGrid);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const returnHome = () => {
        dispatch(changeCurrentGrid(currentGrid));
        navigate('/wizardgram');
    }

    return (
        <div className="instaUserHeader">
            <div className="headerButtons">
                <button className="postButton" onClick={returnHome}>{`<`}</button>
            </div>
            <div className="postsUserHeader">
                <h4 className="usernameHeader">Username</h4>
                <h3 className="usernameHeader">Posts</h3>
            </div>
            <div className="emptyDiv">EmptyDivHere</div>
        </div>
    )
}
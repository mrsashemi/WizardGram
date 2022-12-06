import { Link } from "react-router-dom";

export function EditPostHeader() {
    return (
        <div className="instaUserHeader">
            <Link to='/fishstagram/newpost'>
                <button className="closeNewPost">{`<`}</button>
            </Link>
            <h2>Edit Post</h2>
            <Link to='/fishstagram/createpost'>
                <button className="nextButton">Next</button>
            </Link>
        </div>
    )
}
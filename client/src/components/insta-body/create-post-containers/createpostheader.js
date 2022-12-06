import { Link } from "react-router-dom";

export function CreatePostHeader() {
    return (
        <div className="instaUserHeader">
            <Link to='/fishstagram/editpost'>
                <button className="closeNewPost">{`<`}</button>
            </Link>
            <h2>New Post</h2>
            <Link to='/fishstagram'>
                <button className="shareButton">Share</button>
            </Link>
        </div>
    )
}
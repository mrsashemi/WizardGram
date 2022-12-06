import { Link } from "react-router-dom";

export function NewPostHeader() {
    return (
        <div className="instaUserHeader">
            <Link to='/fishstagram'>
                <button className="closeNewPost">X</button>
            </Link>
            <h2>New Post</h2>
            <button className="nextButton">Next</button>
        </div>
    )
}
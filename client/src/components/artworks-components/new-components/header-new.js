import { Link } from "react-router-dom";

export function NewHeader() {
    return (
        <div className="instaUserHeader">
            <Link to='/fishstagram'>
                <button className="closeNewPost">X</button>
            </Link>
            <h2>New Post</h2>
            <Link to='/fishstagram/editpost'>
                <button className="nextButton">Next</button>
            </Link>
        </div>
    )
}
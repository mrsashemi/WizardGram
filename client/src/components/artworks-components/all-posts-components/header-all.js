import { Link } from "react-router-dom";

export function AllHeader() {
    return (
        <div className="instaUserHeader">
            <div className="headerButtons">
                <Link to='/fishstagram'>
                    <button className="postButton">{`<`}</button>
                </Link>
            </div>
            <div className="postsUserHeader">
                <h4 className="usernameHeader">Username</h4>
                <h3 className="usernameHeader">Posts</h3>
            </div>
            <div className="emptyDiv">EmptyDivHere</div>
        </div>
    )
}
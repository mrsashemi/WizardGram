import { Link, useNavigate } from "react-router-dom";

export function NewHeader({postType}) {
    const navigate = useNavigate();

    const toNextPage = () => {
        if (postType === "photograph") navigate("/fishstagram/editpost")
        else navigate("/fishstagram/createpost")
    }

    return (
        <div className="instaUserHeader">
            <Link to='/fishstagram'>
                <button className="closeNewPost">X</button>
            </Link>
            <h2>New Post</h2>
            <button className="nextButton" onClick={toNextPage}>Next</button>
        </div>
    )
}
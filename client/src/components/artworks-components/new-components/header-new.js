import { Link, useNavigate } from "react-router-dom";

export function NewHeader({postType}) {
    const navigate = useNavigate();

    const toNextPage = () => {
        if (postType === "photograph") navigate("/wizardgram/editpost")
        else navigate("/wizardgram/createpost")
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
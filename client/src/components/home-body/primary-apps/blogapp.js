import { useNavigate } from "react-router-dom";

export function BlogApp() {
    const navigate = useNavigate();

    function onClickBlogApp() {
        navigate('/blog');
    }

    return (
        <div id="shopAppContainer" onClick={onClickBlogApp}>
            <div className="shopAppBackgroundContainer">
                <div className="shopAppBackground"></div>
                <div className="shopAppGlass"></div>
                <div className="shopAppBackgroundMid"></div>
                <div className="shopAppBackgroundTop"></div>
                <div className="shopAppBackgroundTopGlass"></div>
                <div className="shopAppBackgroundFinal"></div>
            </div>
            <h5 className="shopAppTitle">Blog</h5>
        </div>
    )
}
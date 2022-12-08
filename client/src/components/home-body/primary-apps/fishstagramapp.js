import { useNavigate } from "react-router-dom";

export function FishstagramApp() {
    const navigate = useNavigate();

    function onClickFishstagramApp() {
        navigate('/fishstagram');
    }

    return (
        <div id="shopAppContainer" onClick={onClickFishstagramApp}>
            <div className="shopAppBackgroundContainer">
                <div className="shopAppBackground"></div>
                <div className="shopAppGlass"></div>
                <div className="shopAppBackgroundMid"></div>
                <div className="shopAppBackgroundTop"></div>
                <div className="shopAppBackgroundTopGlass"></div>
                <div className="shopAppBackgroundFinal"></div>
            </div>
            <h5 className="shopAppTitle">FishstagramApp</h5>
        </div>
    )
}
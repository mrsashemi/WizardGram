import { useNavigate } from "react-router-dom";

export function ShopApp() {
    let navigate = useNavigate();

    function onClickShopApp() {
        navigate('/shop');
    }

    return (
        <div id="shopAppContainer" onClick={onClickShopApp}>
            <div className="shopAppBackgroundContainer">
                <div className="shopAppBackground"></div>
                <div className="shopAppGlass"></div>
                <div className="shopAppBackgroundMid"></div>
                <div className="shopAppBackgroundTop"></div>
                <div className="shopAppBackgroundTopGlass"></div>
                <div className="shopAppBackgroundFinal"></div>
            </div>
            <h5 className="shopAppTitle">Shop</h5>
        </div>
    )
}
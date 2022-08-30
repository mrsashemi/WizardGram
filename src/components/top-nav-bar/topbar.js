import { Link } from "react-router-dom";
import './stylesheet/topbar.css';
import { Clock } from "./clock";

export function TopNavBar() {

    return (
        <div id="topBarContainer">
            <Clock />
            <div className="topBarLinks">
                <Link to='/'>
                    <div>Home</div>
                </Link>
                    <div className="visibilityQueries">About</div>
                <Link to='/shop'>
                    <div className="visibilityQueries">Shop</div>
                </Link>
            </div>
        </div>
    )
}

export function ShopNavBar() {

    return (
        <div id="topBarContainer">
            <Clock />
            <div className="topBarLinks">
                <Link to='/'>
                    <div>Home</div>
                </Link>
                <div>Contact</div>
                <Link to='/shop'>
                    <div>Shop</div>
                </Link>
                <div>Cart</div>
            </div>
        </div>
    )
}
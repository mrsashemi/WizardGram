import { Link } from "react-router-dom";
import './stylesheet/topbar.css';
import { Clock } from "./clock";

const linkStyle = {
    color: "white"
}

export function TopNavBar() {
    return (
        <div id="topBarContainer">
            <Clock />
            <div className="topBarLinks">
                <Link to='/' style={linkStyle}>
                    <div>Home</div>
                </Link>
                    <div className="visibilityQueries">About</div>
                <Link to='/shop' style={linkStyle}>
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
                <Link to='/' style={linkStyle}>
                    <div>Home</div>
                </Link>
                <div>Contact</div>
                <Link to='/shop' style={linkStyle}>
                    <div>Shop</div>
                </Link>
                <div>Cart</div>
            </div>
        </div>
    )
}
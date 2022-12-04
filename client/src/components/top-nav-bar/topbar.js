import { Link } from "react-router-dom";
import './stylesheet/topbar.css';
import { Clock } from "./clock";
import { linkStyle } from "../../hooks/linkstyle";

export function TopNavBar() {
    return (
        <div id="topBarContainer">
            <Clock />
            <div className="topBarLinks">
                <Link to='/login' style={linkStyle}>
                    <div>Login</div>
                </Link>
                <Link to='/' style={linkStyle}>
                    <div>Home</div>
                </Link>
                <Link to='/' style={linkStyle}>
                    <div className="visibilityQueries">About</div>
                </Link>
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
                <Link to='/login' style={linkStyle}>
                    <div>Login</div>
                </Link>
                <Link to='/' style={linkStyle}>
                    <div>Home</div>
                </Link>
                <Link to='/' style={linkStyle}>
                    <div>Contact</div>
                </Link>
                <Link to='/shop' style={linkStyle}>
                    <div>Shop</div>
                </Link>
                <Link to='/shop/cart' style={linkStyle}>
                    <div>Cart</div>
                </Link>
            </div>
        </div>
    )
}
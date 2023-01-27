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
                <Link to='/wizardgram' style={linkStyle}>
                    <div>Home</div>
                </Link>
                <Link to='/wizardgram' style={linkStyle}>
                    <div className="visibilityQueries">About</div>
                </Link>
            </div>
        </div>
    )
}


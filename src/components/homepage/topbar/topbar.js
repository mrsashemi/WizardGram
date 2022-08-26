import React, { useEffect, useState } from "react";
import '../stylesheet/homepage.css';
import { Clock } from "./clock";

export function TopNavBar() {

    return (
        <div id="topBarContainer">
            <Clock />
            <div className="topBarLinks">
                <div>About</div>
                <div>Shop</div>
                <div>Stuff</div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { images } from "./assets";

export function ShopApp() {

    return (
        <div id="shopAppContainer">
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
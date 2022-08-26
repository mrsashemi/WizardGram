import React, { useEffect, useState } from "react";
import { WeatherApp } from "./weatherapp";

export function MainApps() {

    return (
        <div id="mainAppsContainer">
            <div id="aboutApp">Wizards Robbing Kids</div>
            <WeatherApp />
            <div id="shopApp">Shop</div>
            <div id="analogClock">Clock</div>
        </div>
    )
}
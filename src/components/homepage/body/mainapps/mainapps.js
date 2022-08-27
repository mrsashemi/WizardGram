import React, { useEffect, useState } from "react";
import { TitleApp } from "./titleapp";
import { WeatherApp } from "./weatherapp";

export function MainApps() {

    return (
        <div id="mainAppsContainer">
            <TitleApp />
            <WeatherApp />
            <div id="shopApp">Shop</div>
            <div id="analogClock">Clock</div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { TodayWeather } from "./todayweather";

export function TodayDetails() {

    return (
        <div id="todayDetails">
            <ul className="feelsLike">
                <li><img src="" alt="Temp Icon" className="tempIcon"></img></li>
                <li>Feels Like</li>
                <li className="itFeelsLike">61 F</li>
            </ul>
            <ul className="Humidity">
                <li><img src="" alt="Humidity Icon" className="humidityIcon"></img></li>
                <li>Humidity</li>
                <li className="humidityPercentage">1%</li>
            </ul>
            <ul className="clouds">
                <li><img src="" alt="Cloud Icon" className="cloudIcon"></img></li>
                <li>Cloudiness</li>
                <li className="cloudiness">2%</li>
            </ul>
            <ul className="wind">
                <li><img src="" alt="Wind Icon" className="windIcon"></img></li>
                <li>Wind Speed</li>
                <li className="windSpeed">16.1 mph</li>
            </ul>
        </div>
    )
}

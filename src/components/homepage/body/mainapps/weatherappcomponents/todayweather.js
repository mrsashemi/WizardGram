import React, { useEffect, useState } from "react";

export function TodayWeather(props) {
    return (
        <div id="todayWeather">
            <h1 className="currentWeather">{props.currentWeather}</h1>
            <h3 className="city">{props.currentCity}</h3>
            <div className="time">{props.localDate}</div>
            <div className="temp">{props.currentTemp}</div>
            <img src="" alt="" className="weatherIcon"></img>
        </div>
    )
}

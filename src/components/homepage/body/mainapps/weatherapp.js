import React, { useEffect, useState } from "react";
import { WeatherImgSlider } from "./weatherappcomponents/imgslider";
import { TodayWeatherContainer } from "./weatherappcomponents/todaycontainer";

export function WeatherApp() {

    return (
        <div id="weatherAppContainer">
            <WeatherImgSlider />
            <TodayWeatherContainer />
        </div>
    )
}

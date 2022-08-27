import React, { useEffect, useState } from "react";
import AnalogClock from 'analog-clock-react';

export function AnalogClockApp() {
    let options = {
        width: "16vmin",
        border: true,
        borderColor: "#000000",
        baseColor: "#FFFED8",
        centerColor: "#459cff",
        centerBorderColor: "#000000",
        handColors: {
          second: "#d81c7a",
          minute: "#000000",
          hour: "#000000"
        }
    };

    return (
        <div id="analogClockContainer">
            <div className="analogClockBackgroundContainer">
                <div className="analogClockGlass"></div>
                <div className="analogClockGlass"></div>
                <div className="analogClockBackground"></div>
                <div className="analogContainer">
                    <AnalogClock {...options} />
                </div>
                <div className="analogClockGlass"></div>
                <div className="analogClockBackgroundTop"></div>
                <div className="analogContainer">
                    <AnalogClock {...options} />
                </div>
            </div>
        </div>
    )
}
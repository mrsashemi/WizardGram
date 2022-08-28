import React, { useEffect, useState } from "react";
import './stylesheets/portal.css'
import { PortalBackgroundGlow, SimplePortalBackgroundGlow } from "./portal/portal-glow";
import { PortalBackground, SimplePortalBackground } from "./portal/portal";

export function Background() {
    const [opacityRange, setOpacityRange] = useState(255);

    function opacitySlider(e) {
        setOpacityRange(() => e.target.value)
    }

    return (
        <div id="backgroundContainer">
            <PortalBackgroundGlow opacityRange={opacityRange} />
            <PortalBackground opacityRange={opacityRange} />
            <div className="slider">
                <input 
                    type="range" 
                    id="colorrange" 
                    value={opacityRange} 
                    min="0" max="255" 
                    onChange={opacitySlider} 
                />
            </div>
        </div>
    )
}

export function SimpleBackground() {
    return (
        <div id="backgroundContainer">
            <SimplePortalBackgroundGlow />
            <SimplePortalBackground />
            <div id="whiteGlassBackground"></div>
        </div>
    )
}
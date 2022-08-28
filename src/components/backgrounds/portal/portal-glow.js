import React, { useEffect, useState } from "react";
import '../stylesheets/portal.css'
import uniqid from 'uniqid';

export function PortalBackgroundGlow(props) {
    const [portalSquares] = useState(Array.apply(null, Array(24)).map(() => {return {id: uniqid}}))
    const [portalOpacity] = useState(props.opacityRange/255)
    const [portalVisibility, setPortalVisibility] = useState('none')
    const [animateClass, setAnimateClass] = useState('nonanimated')

    function startGlowEffect(e) {
        e.target.style.opacity = 0;
        e.target.style.visibility = 'visible';
        e.target.style.transition = 'opacity 0.2s linear'
    }

    function fadeGlowEffect(e) {
        e.target.style.opacity = 0.6;
        e.target.style.transition = `visibility 1s 10s, opacity 10s linear`;
    }

    useEffect(() => {
        if (portalOpacity !== props.opacityRange/255) setAnimateClass(() => 'animate');
        (props.opacityRange === 255) ? setPortalVisibility(() => 'none') : setPortalVisibility(() => 'grid');
    }, [props.opacityRange, portalOpacity]);

    return (
        <div id="portalGlow" className={animateClass}>
            <div id="portalGlow2" className={animateClass} style={{display: portalVisibility}}>
                {portalSquares.map((square, index) => {
                    return (
                        <div 
                            className="glowSquare" 
                            key={index} 
                            onMouseEnter={startGlowEffect}
                            onMouseLeave={fadeGlowEffect}
                        ></div>
                    )
                })}
            </div>
        </div>
    )
}


export function SimplePortalBackgroundGlow() {
    return (
        <div id="portalGlow">
            <div id="portalGlow2">
            </div>
        </div>
    )
}

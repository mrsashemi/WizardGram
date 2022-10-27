import AnalogClock from 'analog-clock-react';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../../../hooks/windowsize'

export function AnalogClockApp() {
    const windowSize = useWindowSize();
    const [options, setOptions] = useState(
        {
            width: "9.75rem",
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
        }
    )

    //useEffect to dynamically change the size of the clock according to the window size
    useEffect(() => {
        if (windowSize.width < 500) {
            setOptions(prevOptions => ({
                ...prevOptions,
                width: "4.75rem"
            }))
        } else {
            setOptions(prevOptions => ({
                ...prevOptions,
                width: "9.75rem"
            }))
        }
    }, [windowSize])

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
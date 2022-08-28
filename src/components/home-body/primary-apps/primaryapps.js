import { AnalogClockApp } from "./analogclock";
import { ShopApp } from "./shopapp";
import { TitleApp } from "./titleapp";
import { WeatherApp } from "./weatherapp";

export function MainApps() {

    return (
        <div id="mainAppsContainer">
            <TitleApp />
            <AnalogClockApp />
            <WeatherApp />
            <ShopApp />
        </div>
    )
}
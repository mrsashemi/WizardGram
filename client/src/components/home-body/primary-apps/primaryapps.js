import { AnalogClockApp } from "./analogclock";
import { BlogApp } from "./blogapp";
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
            <BlogApp />
        </div>
    )
}
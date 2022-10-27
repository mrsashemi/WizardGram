import { WeatherImgSlider } from "../../home-weather-app-components/imgslider";
import { TodayWeatherContainer } from "../../home-weather-app-components/todaycontainer";



export function WeatherApp() {

    return (
        <div id="weatherAppContainer">
            <WeatherImgSlider />
            <TodayWeatherContainer />
        </div>
    )
}

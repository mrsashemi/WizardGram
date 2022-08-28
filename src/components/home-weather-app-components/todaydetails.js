export function TodayDetails(props) {

    return (
        <div id="todayDetails">
            <ul className="feelsLike">
                <li><img src={props.tempIcon} alt="Temp Icon" className="tempIcon"></img></li>
                <li>Feels Like</li>
                <li className="itFeelsLike">{props.feelsLike}</li>
            </ul>
            <ul className="Humidity">
                <li><img src={props.humidityIcon} alt="Humidity Icon" className="humidityIcon"></img></li>
                <li>Humidity</li>
                <li className="humidityPercentage">{props.humidity}</li>
            </ul>
            <ul className="clouds">
                <li><img src={props.cloudIcon} alt="Cloud Icon" className="cloudIcon"></img></li>
                <li>Cloudiness</li>
                <li className="cloudiness">{props.cloudiness}</li>
            </ul>
            <ul className="wind">
                <li><img src={props.windIcon} alt="Wind Icon" className="windIcon"></img></li>
                <li>Wind Speed</li>
                <li className="windSpeed">{props.wind}</li>
            </ul>
        </div>
    )
}

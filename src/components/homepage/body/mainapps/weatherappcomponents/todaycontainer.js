import React, { useEffect, useState } from "react";
import { TodayDetails } from "./todaydetails";
import { TodayWeather } from "./todayweather";

export function TodayWeatherContainer() {
    const [error, setError] = useState(null);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [location, setLocation] = useState('Osaka')
    const [currentWeather, setCurrentWeather] = useState('');
    const [currentCity, setCurrentCity] = useState('');
    const [currentTemp, setCurrentTemp] = useState('');
    const [currentIcon, setCurrentIcon] = useState('');
    const [utcTime, setUtc] = useState(new Date().getTimezoneOffset()*60*1000);
    const [timeChange, setTimeChange] = useState('');
    const [localDate, setLocalDate] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [humidity, setHumidity] = useState('');
    const [cloudiness, setCloudiness] = useState('');
    const [wind, setWind] = useState('');
    const [tempIcon, setTempIcon] = useState('');
    const [cloudIcon, setCloudIcon] = useState(`https://www.veryicon.com/download/png/weather/icon-by-qning/weather-icon-cloudy?s=256`);
    const [humidityIcon, setHumidityIcon] = useState('https://icons.veryicon.com/png/128/weather/weather-colored-outline/humidity-24.png');
    const [windIcon, setWindIcon] = useState('https://cdn-icons-png.flaticon.com/128/1458/1458846.png');

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=99b2660cb4dd6a884a9f1fbb2a34ba05&units=imperial`, {mode: 'cors'})
            .then(res => res.json())
            .then(
                (result) => {
                    setCurrentWeather(() => result.weather[0].description);
                    setCurrentCity(() => result.name);
                    setCurrentTemp(() => `${result.main.feels_like} \u00B0 F`);
                    setCurrentIcon(() => `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
                    setTimeChange(() => result.timezone * 1000);
                    setFeelsLike(() => `${result.main.feels_like} \u00B0 F`);
                    setHumidity(() => `${result.main.humidity}%`);
                    setCloudiness(() => `${result.clouds.all}%`);
                    setWind(() => `About ${result.wind.speed} mph`);
                    setTempIcon(() => `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
                    setApiSuccess(() => true);
                },
                (error) => {
                    console.log("error")
                    setError(error);
                }
            )
    }, []);

    useEffect(() => {
        if (apiSuccess) {
            let milliseconds = new Date().getTime()+utcTime+timeChange
            let time = new Date(milliseconds);
            let localTime = time.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
            setLocalDate(prevDate => localTime);
            console.log(localTime);
        }
    }, [apiSuccess])

    return (
        <div id="todayWeatherContainer">
            <TodayWeather 
                currentWeather = {currentWeather}
                currentCity = {currentCity}
                currentTemp = {currentTemp}
                currentIcon = {currentIcon}
                localDate={localDate}
            />
            <div className="breakContent"></div>
            <TodayDetails
                feelsLike = {feelsLike}
                humidity = {humidity}
                cloudiness = {cloudiness}
                wind = {wind}
                tempIcon = {tempIcon}
                humidityIcon = {humidityIcon}
                cloudIcon = {cloudIcon}
                windIcon = {windIcon}
            />
        </div>
    )
}

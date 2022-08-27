import { waitFor } from "@testing-library/react";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { TodayWeatherContainer } from "../todaycontainer";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

it("renders weather data", async () => {
    //for our fetch, we're using the same city from the weather api (no search functionality for now)
    //we can mock the api and check whether it pulls the city correctly
    //since the rest of the data can change as the weather changes, the rest is included in fakeWeather just to ensure the mock is working properly
    const fakeWeather = {
        name: "Osaka",
        weather: [61],
        main: {feels_like: 61},
        clouds: {all: 80},
        wind: {speed: 15}
    };

    const mockedFetch = jest.spyOn(global, "fetch").mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeWeather)
        })
    );

    await act(async () => {
        render(<TodayWeatherContainer />, container);
    })

    await waitFor(() => {
        expect(container.querySelector(".city").textContent).toBe(fakeWeather.name);
        expect(mockedFetch).toBeCalledTimes(1);
    })

    global.fetch.mockRestore();
})
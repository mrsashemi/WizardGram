import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Background } from "../background"

describe("Background Component", () => {
    it("renders the page correctly", () => {
        const { background } = render(<Background />);
        expect(background).toMatchSnapshot();
    })

    it("changes the slider onChange event", () => {
        render(<Background />);
        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: 170 } });

        expect(slider.value).toEqual("170");
    })
})

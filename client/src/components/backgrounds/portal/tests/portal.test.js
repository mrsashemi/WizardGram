import React from "react";
import { render, screen } from "@testing-library/react";
import { PortalBackground } from "../portal";

describe("Portal Component", () => {
    it("renders correct amount of div squares", () => {
        render(<PortalBackground />)
        const squares = screen.getAllByRole('background-styling')
        expect(squares).toHaveLength(24);
    })
})

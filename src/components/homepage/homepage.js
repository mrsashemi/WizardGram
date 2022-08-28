import React, { useEffect, useState } from "react";
import './stylesheet/homepage.css'
import { PageBody } from "./body/body";
import { Background } from "../backgrounds/background";
import { TopNavBar } from "../topbar/topbar";

export function Homepage() {

    return (
        <div>
            <Background />
            <div id="homepageContainer">
                <TopNavBar />
                <PageBody />
                <div className="dock"></div>
            </div>
        </div>
    )
}
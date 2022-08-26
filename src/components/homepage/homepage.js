import React, { useEffect, useState } from "react";
import { TopNavBar } from "./topbar/topbar";
import './stylesheet/homepage.css'
import { PageBody } from "./body/body";

export function Homepage() {

    return (
        <div id="homepageContainer">
            <TopNavBar />
            <PageBody />
            <div className="dock"></div>
        </div>
    )
}
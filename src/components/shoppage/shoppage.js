import React, { useEffect, useState } from "react";
import { SimpleBackground } from "../backgrounds/background";
import { ShopNavBar, TopNavBar } from "../topbar/topbar";
import { ShopPageBody } from "./shopbody/shopbody";
import './stylesheet/shoppage.css'

export function ShopPage() {
    return (
        <div>
            <SimpleBackground />
            <div id="shopPageContainer">
                <ShopNavBar />
                <ShopPageBody />
            </div>
        </div>
    )
}
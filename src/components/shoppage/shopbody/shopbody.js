import React, { useEffect, useState } from "react";
import { ShopNav } from "./shopnav/shopnav";

export function ShopPageBody() {

    return (
        <div id="shopPageBodyContainer">
            <ShopNav />
            <div className="products"></div>
        </div>
    )
}
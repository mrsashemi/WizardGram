import React, { useEffect, useState } from "react";
import { ShopProducts } from "./productpage/products";
import { ShopNav } from "./shopnav/shopnav";

export function ShopPageBody() {

    return (
        <div id="shopPageBodyContainer">
            <ShopNav />
            <ShopProducts />
        </div>
    )
}
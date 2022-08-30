import { Routes, Route, Outlet } from "react-router-dom";
import { ShopCommissions } from "./commissions";

export function ShopProducts() {
    return (
        <div id="shopProductListContainer">
            <div className="shopProductList">
                <div className="headerAndCart">
                    <h1 className="productHeader">Products</h1>
                    <h1 className="productHeader">Cart</h1>
                </div>
               <Outlet />
            </div>
        </div>
    )
}
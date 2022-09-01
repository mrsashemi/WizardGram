import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { linkStyleBlack } from "../../../hooks/linkstyle";

export function ShopProducts() {
    const [cart, setCart] = useState([]);

    return (
        <div id="shopProductListContainer">
            <div className="shopProductList">
                <div className="headerAndCart">
                    <Link to="/shop" style={linkStyleBlack}>
                        <h1 className="productHeader">Products</h1>
                    </Link>
                    <Link to="/shop/cart" style={linkStyleBlack}>
                        <h1 className="productHeader">Cart{cart.length > 0 && `: ${cart.length}`}</h1>
                    </Link>
                </div>
                <Outlet context={[cart, setCart]} />
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

export function ShopProducts() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log(cart);
    }, [cart]);


    return (
        <div id="shopProductListContainer">
            <div className="shopProductList">
                <div className="headerAndCart">
                    <h1 className="productHeader">Products</h1>
                    <Link to="/shop/cart">
                        <h1 className="productHeader">Cart{cart.length > 0 && `: ${cart.length}`}</h1>
                    </Link>
                </div>
               <Outlet context={[cart, setCart]} />
            </div>
        </div>
    )
}
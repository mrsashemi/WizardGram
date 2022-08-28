import { ShopProducts } from "./product-page/products";
import { ShopNav } from "./shop-nav/shopnav";

export function ShopPageBody() {

    return (
        <div id="shopPageBodyContainer">
            <ShopNav />
            <ShopProducts />
        </div>
    )
}
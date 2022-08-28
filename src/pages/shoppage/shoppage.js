import { SimpleBackground } from "../../components/backgrounds/background";
import { ShopPageBody } from "../../components/shop-body/shopbody";
import { ShopNavBar } from "../../components/top-nav-bar/topbar";
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
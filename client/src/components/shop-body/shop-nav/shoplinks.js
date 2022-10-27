import { Link } from "react-router-dom";
import { linkStyleBlack } from "../../../hooks/linkstyle";

export function ShopLinks() {
    return (
        <div id="shopLinksContainer">
            <div className="shopProductLinks">
                <Link to="/shop/prints" style={linkStyleBlack}>
                    <h1 className="productLink">Prints</h1>
                </Link>
                <Link to="/shop/merchandise" style={linkStyleBlack}>
                    <h1 className="productLink">Merchandise</h1>
                </Link>
                <Link to="/shop/NFT" style={linkStyleBlack}>
                    <h1 className="productLink">NFT</h1>
                </Link>
                <Link to="/shop/commissions" style={linkStyleBlack}>
                    <h1 className="productLink">Commissions</h1>
                </Link>
            </div>
        </div>
    )
}
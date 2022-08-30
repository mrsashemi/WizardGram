import { Link } from "react-router-dom";

export function ShopLinks() {
    return (
        <div id="shopLinksContainer">
            <div className="shopProductLinks">
                <Link to="/shop/prints">
                    <h1 className="productLink">Prints</h1>
                </Link>
                <Link to="/shop/merchandise">
                    <h1 className="productLink">Merchandise</h1>
                </Link>
                <Link to="/shop/NFT">
                    <h1 className="productLink">NFT</h1>
                </Link>
                <Link to="/shop/commissions">
                    <h1 className="productLink">Commissions</h1>
                </Link>
            </div>
        </div>
    )
}
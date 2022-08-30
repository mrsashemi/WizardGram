import { Link } from "react-router-dom"
import { merchandise } from "../../../data/product-data"

export function ShopMerch() {
    return (
        <div id="productsContainer">
            {merchandise.map((merch) => {
                return (
                    <div className="productCardContainer" key={merch.id}>
                        <div className="productImgContainer">
                            <div className="productImgGlass"></div>
                            <img src={merch.imgPreview} alt={merch.name}></img>
                        </div>
                        <Link to={`/shop/merchandise/${merch.id}`}>
                            <h4 key={merch.id} className="itemTitle">{merch.name}</h4>
                        </Link>
                        <h6>${merch.price[0][1]}+</h6>
                        <div className="addToCart">
                            <button>Add To Cart</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
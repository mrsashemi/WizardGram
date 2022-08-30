import { Link } from "react-router-dom"
import { prints } from "../../../data/product-data"

export function ShopPrints() {
    return (
        <div id="productsContainer">
            {prints.map((print) => {
                return (
                    <div className="productCardContainer" key={print.id}>
                        <div className="productImgContainer">
                            <div className="productImgGlass"></div>
                            <img src={print.imgPreview} alt={print.name}></img>
                        </div>
                        <Link to={`/shop/prints/${print.id}`}>
                            <h4 key={print.id} className="itemTitle">{print.name}</h4>
                        </Link>
                        <h6>${print.price[0][1]}+</h6>
                        <div className="addToCart">
                            <button>Add To Cart</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { prints } from "../../../data/product-data"

export function ShopPrints() {
    const [loading, setLoading] = useState(true);
    const counter = useRef(0);
    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current >= prints.length) {
            setLoading(false);
        }
    }

    

    return (
        <React.Fragment>
            <div id="productsContainer" style={{display: loading ? "block" : "none"}}>
                Loading...
            </div>
            <div id="productsContainer" style={{display: loading ? "none" : "grid"}}>
                {prints.map((print) => {
                    return (
                        <div className="productCardContainer" key={print.id}>
                            <div className="productImgContainer">
                                <div className="productImgGlass"></div>
                                <img src={print.imgPreview} alt={print.name} onLoad={imageLoaded}></img>
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
        </React.Fragment>
    )
}
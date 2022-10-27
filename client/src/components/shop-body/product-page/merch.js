import React, { useRef, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { merchandise } from "../../../data/product-data"
import { linkStyleBlack } from "../../../hooks/linkstyle";

export function ShopMerch() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const counter = useRef(0);
    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current >= merchandise.length) {
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <div id="productsContainer" style={{display: loading ? "block" : "none"}}>
                Loading...
            </div>
            <div id="productsContainer">
                {merchandise.map((merch) => {
                    return (
                        <div className="productCardContainer" key={merch.id}>
                            <div className="productImgContainer">
                                <div className="productImgGlass" onClick={() => navigate(`/shop/merchandise/${merch.id}`)}></div>
                                <img src={merch.imgPreview} alt={merch.name} onLoad={imageLoaded} id={`product-${merch.class}`}></img>
                            </div>
                            <Link to={`/shop/merchandise/${merch.id}`} style={linkStyleBlack}>
                                <h4 key={merch.id} className="itemTitle">{merch.name}</h4>
                            </Link>
                            <h6>${merch.price[0][1]}+</h6>
                            <h6 style={{color: "red"}}>Limit 2</h6>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}
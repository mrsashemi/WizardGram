import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { merchandise } from "../../../data/product-data";

export function MerchDetail() {
    const itemId = useParams();
    const [merch, setMerch] = useState();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let selectedItem = merchandise.filter((item) => {return item.id === itemId.id});
        setMerch(() => selectedItem[0]);
    },[merch, itemId.id])

    function advanceIndex() {
        if (index < merch.imgExamples.length - 1) {
            setIndex(idx => idx + 1)
        } else {
            setIndex (() => 0);
        }
    }

    return (
        <div id="itemDetail">
            <div className="itemImgContainer" id={merch && merch.class}>
                <img src={merch && merch.imgPreview} alt={merch && merch.name} className={merch && merch.class}></img>
            </div>
            <div className="itemPreviews">
                <img src={merch && merch.imgExamples.length > 0 && merch.imgExamples[index]} alt={merch && merch.name} onClick={merch && merch.imgExamples.length > 0 && advanceIndex}></img>
            </div>
            <div className="pricingOptions">
                {merch && merch.price.map((pricing) => {
                    return (
                        <div key={`${merch && merch.id}-${merch && pricing[0]}`}>
                            <label htmlFor={merch && pricing[0]}>{merch && pricing[0]}: ${merch && pricing[1]}</label>
                            <input type="checkbox" id={merch && pricing[0]} value={merch && pricing[1]}></input>
                        </div>
                    )
                })}
                <div className="totalPrice">Total: {`(shipping calculated at checkout)`}</div>
                <button>Add To Cart</button><br></br><br></br>
                <div className="terms">
                Limit two per customer. Please allow 6-8 weeks for fulfillment. Additional time may be needed if framing or detailing is requested.
                International customers are responsible for any customs fees and taxes that may be charged upon arrival in the destination country.
                Pricing is subject to change.
                </div>
            </div>
            <div className="itemDescription">
                <p>{merch && merch.description}</p>
            </div>
        </div>
    )
}
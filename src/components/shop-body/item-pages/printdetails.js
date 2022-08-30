import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { prints } from "../../../data/product-data";

export function PrintDetail() {
    const itemId = useParams();
    const [print, setPrint] = useState();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let selectedItem = prints.filter((item) => {return item.id === itemId.id});
        setPrint(() => selectedItem[0]);
        console.log(print);
    },[print, itemId.id])

    function advanceIndex() {
        if (index < print.imgExamples.length - 1) {
            setIndex(idx => idx + 1)
        } else {
            setIndex (() => 0);
        }
    }

    return (
        <div id="itemDetail">
            <div className="itemImgContainer" id={print && print.class}>
                <img src={print && print.imgPreview} alt={print && print.name} className={print && print.class}></img>
            </div>
            <div className="itemPreviews">
                <img src={print && print.imgExamples.length > 0 && print.imgExamples[index]} alt={print && print.name} onClick={print && print.imgExamples.length > 0 && advanceIndex}></img>
            </div>
            <div className="pricingOptions">
                {print && print.price.map((pricing) => {
                    return (
                        <div key={`${print && print.id}-${print && pricing[0]}`}>
                            <label htmlFor={print && pricing[0]}>{print && pricing[0]}: ${print && pricing[1]}</label>
                            <input type="checkbox" id={print && pricing[0]} value={print && pricing[1]}></input>
                        </div>
                    )
                })}
                <div className="totalPrice">Total: {`(shipping calculated at checkout)`}</div>
                <button>Add To Cart</button><br></br><br></br>
                <div className="terms">
                Limit one per customer. Please allow 6-8 weeks for fulfillment. Additional time may be needed if framing or detailing is requested.
                International customers are responsible for any customs fees and taxes that may be charged upon arrival in the destination country.
                Pricing is subject to change.
                </div>
            </div>
            <div className="itemDescription">
                <p>{print && print.description}</p>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { prints } from "../../../data/product-data";

export function PrintDetail() {
    const itemId = useParams();
    const [print, setPrint] = useState();
    const [index, setIndex] = useState(0);
    const [pricingDetails, setPricingDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [buttonOpacity, setButtonOpacity] = useState('0.5');
    const [buttonEvents, setButtonEvents] = useState('none');
    const [cart, setCart] = useOutletContext();

    

    useEffect(() => {
        let selectedItem = prints.filter((item) => {return item.id === itemId.id});
        setPrint(() => selectedItem[0]);
    },[print, itemId.id])

    useEffect(() => {
        let newTotal = pricingDetails.reduce((a, b) => a + b[1], 0)
        setTotalPrice(price => price = newTotal);

        if (pricingDetails.length > 0 && pricingDetails.some(item => item[0].includes("Print") || item[0].includes("Woodcut"))) {
            setButtonOpacity(() => '1');
            setButtonEvents(() => 'all');
        } else {
            setButtonOpacity(() => '0.5');
            setButtonEvents(() => 'none');
        }
    }, [pricingDetails])

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
           {print && print.imgExamples.length > 0 && <div className="itemPreviews">
                <img src={print && print.imgExamples.length > 0 && print.imgExamples[index]} alt={print && print.name} onClick={(print && print.imgExamples.length > 0) ? advanceIndex : undefined}></img>
            </div>}
            <div className="itemDescription">
                <p>{print && print.description}</p>
            </div>
            <div className="pricingOptions">
                {print && print.price.map((pricing) => {
                    return (
                        <div key={`${print && print.id}-${print && pricing[0]}`} className="pricingInput">
                            <label htmlFor={print && pricing[0]} className="pricingLabel">{print && pricing[0]}: ${print && pricing[1]}</label>
                            <input type="checkbox" id={print && pricing[0]} value={print && pricing[1]} className="pricingCheckbox" onClick={(e) => {
                                setPricingDetails((arr) => {
                                    if (pricingDetails.some(item => item === pricing)) {
                                       let filteredPricing = arr.filter(item => item !== pricing);
                                       return [...filteredPricing];
                                    } else {
                                        if ((pricing[0].includes("Print") && pricingDetails.some(item => item[0].includes("Print"))) 
                                        || (pricing[0].includes("Woodcut") && pricingDetails.some(item => item[0].includes("Woodcut")))) {
                                            e.target.checked = false;
                                            return arr;
                                        } else {
                                            return arr.concat([pricing]);
                                        }
                                    }
                                })
                            }}></input>
                        </div>
                    )
                })}
                <div className="totalPrice">Total: {totalPrice} {`(shipping calculated at checkout)`}</div>
                <div className="addToCart">
                    <button style={{pointerEvents: buttonEvents, opacity: buttonOpacity}} className="addToButton" onClick={(e) => {
                        setCart((arr) => {
                            if (!cart.some(item => print.id === item.id)) {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                                return arr.concat([{id: print.id, name: print.name, details: pricingDetails, total: totalPrice, preview: print.imgPreview, quantity: 1}]);
                            }
                        });
                    }}>Add To Cart<span></span></button>
                    <button className="removeFromButton" onClick={(e) => {
                        setCart(() => {
                            e.target.style.display = 'none';
                            e.target.parentElement.firstChild.style.display = 'block';
                            let newCart = cart.filter(item => item.id !== print.id);
                            return [...newCart];
                        });
                    }}>Remove From Cart<span></span></button>
                </div><br></br><br></br>
                <div className="terms">
                Limit one per customer. Please allow 6-8 weeks for fulfillment. Additional time may be needed if framing or detailing is requested.
                International customers are responsible for any customs fees and taxes that may be charged upon arrival in the destination country.
                Pricing is subject to change.
                </div>
            </div>
        </div>
    )
}
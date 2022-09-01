import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { merchandise } from "../../../data/product-data";
import classnames from 'classnames'

export default function MerchDetail() {
    const itemId = useParams();
    const [merch, setMerch] = useState();
    const [index, setIndex] = useState(0);
    const [pricingDetails, setPricingDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [buttonOpacity, setButtonOpacity] = useState('0.5');
    const [buttonEvents, setButtonEvents] = useState('none');
    const [cart, setCart] = useOutletContext();
    
    useEffect(() => {
        let selectedItem = merchandise.filter((item) => {return item.id === itemId.id});
        setMerch(() => selectedItem[0]);

        if (merch) {
            let filteredCart = cart.filter(item => item.id.includes(merch.id));
            setItemCount(count => count = filteredCart.length);
        } 
    },[merch, itemId.id]);

    useEffect(() => {
        let newTotal = pricingDetails.reduce((a, b) => a + b[1], 0)
        setTotalPrice(price => price = newTotal);

        if (pricingDetails.length > 0 && pricingDetails.some(item => item === merch.price[0])) {
            setButtonOpacity(() => '1');
            setButtonEvents(() => 'all');
        } else {
            setButtonOpacity(() => '0.5');
            setButtonEvents(() => 'none');
        }
    }, [pricingDetails]);

    useEffect(() => {
        if (merch) {
            let filteredCart = cart.filter(item => item.id.includes(merch.id));
            setItemCount(count => count = filteredCart.length);
        }
    }, [cart])


    function advanceIndex() {
        if (index < merch.imgExamples.length - 1) {
            setIndex(idx => idx + 1)
        } else {
            setIndex (() => 0);
        }
    }

    function calculatePricingDetails(pricing, e) {
        setPricingDetails((arr) => {
            if (pricingDetails.some(item => item === pricing)) {
               let filteredPricing = arr.filter(item => item !== pricing);
               return [...filteredPricing];
            } else {
                return arr.concat([pricing]);
            }
        })
    }

    function addToCart(e) {
        setCart((arr) => {
            if (!cart.some(item => merch.id === item.id)) {
                return arr.concat([{
                    id: merch.id, 
                    name: merch.name, 
                    details: pricingDetails, 
                    total: totalPrice, 
                    preview: merch.imgPreview
                }]);
            }
        });
    }

    function decrementCart() {
        setCart(() => {
            if (cart.some(item => `${merch.id}-2` === item.id)) {
                let newCart = cart.filter(item => item.id !== `${merch.id}-2`)
                return [...newCart];
            } else {
                let newCart = cart.filter(item => item.id !== merch.id);
                return [...newCart];
            }
        });
    }

    function incrementCart() {
        setCart((arr) => {
            if (cart.some(item => merch.id === item.id)) {
                return arr.concat([{
                    id: `${merch.id}-2`, 
                    name: merch.name, 
                    details: pricingDetails, 
                    total: totalPrice, 
                    preview: merch.imgPreview
                }]);
            }
        });
    }


    return (
        <div id="itemDetail">
            <div className="itemImgContainer" id={merch && merch.class}>
                <img 
                    src={merch && merch.imgPreview} 
                    alt={merch && merch.name} 
                    className={merch && merch.class}
                ></img>
            </div>
            <div className="itemPreviews">
                <img 
                    src={merch && merch.imgExamples.length > 0 && merch.imgExamples[index]} 
                    alt={merch && merch.name} onClick={merch && merch.imgExamples.length > 0 && advanceIndex}
                ></img>
            </div>
            <div className="pricingOptions">
                {merch && merch.price.map((pricing) => {
                    return (
                        <div 
                            key={`${merch && merch.id}-${merch && pricing[0]}`} 
                            className="pricingInput"
                        >
                            <label 
                                htmlFor={merch && pricing[0]} 
                                className="pricingLabel"
                            >{merch && pricing[0]}: ${merch && pricing[1]}.00</label>
                            <input 
                                type="checkbox" 
                                id={merch && pricing[0]} 
                                value={merch && pricing[1]} 
                                className="pricingCheckbox" 
                                onClick={(e) => calculatePricingDetails(pricing, e)}
                            ></input>
                        </div>
                    )
                })}
                <div 
                    className="totalPrice"
                >Total: ${(totalPrice === 0) ? `000` : totalPrice}.00 {`(shipping calculated at checkout)`}</div>
                <div className="addToCart">
                    {merch && (!cart.some(item => merch.id === item.id)) ? <button 
                        className={classnames("addToButton", "shopButtonStyle")} 
                        style={{pointerEvents: buttonEvents, opacity: buttonOpacity}} 
                        onClick={(e) => addToCart(e)}
                    >Add To Cart<span className="shopSpanStyle"></span></button>
                    : <div className="incrementCart">
                        <button 
                            className={classnames("incrementButton", "shopButtonStyle")} 
                            onClick={(e) => decrementCart(e)}
                        >-<span className="shopSpanStyle"></span></button>
                        <h6>{itemCount}</h6>
                        <button
                            style={{opacity: (itemCount === 2) ? '0.5' : '1', pointerEvents: (itemCount === 2) ? 'none' : 'all'}}
                            className={classnames("incrementButton", "shopButtonStyle")} 
                            onClick={(e) => incrementCart(e)}>+<span 
                            className="shopSpanStyle"
                        ></span></button>
                    </div>}
                </div><br></br><br></br>
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
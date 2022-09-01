import React, { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom"
import classnames from 'classnames';

export default function ShopCart() {
    const [cart, setCart] = useOutletContext();
    const [cartTotal, setCartTotal] = useState(0);
  
    useEffect(() => {
        let newTotal = cart.reduce((a, b) => a + b.total, 0)
        setCartTotal(total => total = newTotal);
    }, [cart]);

    function removeFromCart(item) {
        setCart(() => {
            let newCart = cart.filter(cartItem => cartItem.id !== item.id);
            return [...newCart];
        });
    }

  

    return (
        <div id="shoppingPageCart">
            {cart.map((item, index) => {
                return (
                    <div className="cartItemCard" key={`${item.id}-${index}`}>
                        <div className="cartCardItemContent">
                            <div className="cartItemAndImgFlex">
                                <div>
                                    <h3 className="cardItemHeaders">{item.name}</h3>
                                    <div className="cartItemDetailsCard">
                                        {item.details.map((detail, index) => {
                                            return (
                                                <h5 
                                                    className="cardItemHeaders" 
                                                    key={`${detail[0]}-${index}`}
                                                >{detail[0]}: ${detail[1]}.00</h5>
                                            )
                                        })}
                                    </div>
                                    <h4 className="cardItemHeaders">Total: ${item.total}.00</h4>
                                    <button 
                                        className={classnames("removeFromButton", "shopButtonStyle")} 
                                        onClick={() => removeFromCart(item)}
                                    >Remove From Cart<span className="shopSpanStyle"></span></button>
                                </div>
                                <div className="cartItemImgPrev">
                                    <img src={item.preview}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="cartTotalPrice">
                <h2 className="cardItemHeaders">{`Cart Total: ${cartTotal}.00 (taxes and shipping calculated at checkout)`}</h2>
                <Link to="/shop">
                    <button 
                        className={classnames("checkOutButton", "shopButtonStyle")}
                    >Checkout<span className="shopSpanStyle"></span></button>
                </Link>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"

export function ShopCart() {
    const [cart, setCart] = useOutletContext();
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        let newTotal = cart.reduce((a, b) => a + b.total, 0)
        setCartTotal(total => total = newTotal);
    }, [cart])

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
                                                <h5 className="cardItemHeaders" key={`${detail[0]}-${index}`}>{detail[0]}: ${detail[1]}.00</h5>
                                            )
                                        })}
                                    </div>
                                    <h4 className="cardItemHeaders">Total: ${item.total}.00</h4>
                                    <button onClick={() => {
                                        setCart(() => {
                                            let newCart = cart.filter(cartItem => cartItem.id !== item.id);
                                            return [...newCart];
                                        });
                                    }}>Remove From Cart<span></span></button>
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
                <h2 className="cardItemHeaders">Cart Total: ${cartTotal}.00</h2>
                <button className="checkOutButton">Checkout</button>
            </div>
        </div>
    )
}
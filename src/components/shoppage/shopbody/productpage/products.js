import React, { useEffect, useState } from "react";
import uniqid from 'uniqid';
import { productImages } from "./productassets";

export function ShopProducts() {
    const [prints, setPrints] = useState([
        {name: "Block Prints",
        url: productImages['blockexample.jpg'], 
        id: uniqid(), 
        price: {asIs: "100.00", addResin: "150.00", additionalColoring: "100.00"},
        examples: [productImages['block1.jpg'], productImages['block2.jpg']]},
        {name: "The Chicken Eats Its Own Leg", 
        url: productImages['chickeneatsitsownleg.jpg'], 
        id: uniqid(), 
        price: {asIs: "200.00", addResin: "150.00", additionalColoring: null},
        examples: []},
        {name: "Eggllusion Woodcut", 
        url: productImages["eggllusion.PNG"], 
        id: uniqid(), 
        price: {asIs: "400.00", addResin: "200.00", additionalColoring: "200.00"},
        examples: [productImages['eggwoodcut']]},
        {name: "The Illusion", 
        url: productImages["illusion.jpg"], 
        id: uniqid(), 
        price: {asIs: "300.00", addResin: "150.00", additionalColoring: null},
        examples: []},
        {name: "Internet Wars", 
        url: productImages["internetwars.jpg"], 
        id: uniqid(), 
        price: {asIs: "200.00", addResin: "150.00", additionalColoring: null},
        examples: []},
        {name: "Visual", 
        url: productImages["visual.JPG"], 
        id: uniqid(), 
        price: {asIs: "150.00", addResin: "125.00", additionalColoring: null},
        examples: []}
    ])

    const [merchandise, setMerchandise] = useState([
        {name: "Art Deck",
        url: productImages['skateboard.jpg'], 
        id: uniqid(), 
        price: {asIs: "150.00"},
        examples: [productImages['deckexample.jpg']]},
        {name: "Art Griptape",
        url: productImages['griptape.jpg'], 
        id: uniqid(), 
        price: {asIs: "60.00"},
        examples: [productImages['gripexample.jpg']]},
    ])

    return (
        <div id="shopProductListContainer">
            <div className="shopProductList">
                <div className="headerAndCart">
                    <h1 className="productHeader">Products</h1>
                    <h1 className="productHeader">Cart</h1>
                </div>
            </div>
        </div>
    )
}
import uniqid from 'uniqid';
import { productImages } from './product-assets';

export const prints = [
    {
        name: "Block Prints",
        category: "Prints",
        categoryId: "prints",
        id: `block-prints-${uniqid()}`, 
        price: {
            print: 100.00, 
            frame: 150.00, 
            extra: 100.00
        },
        imgPreview: productImages['blockexample.jpg'], 
        imgExamples: [productImages['block1.jpg'], productImages['block2.jpg']]
    },
    {
        name: "The Chicken Eats Its Own Leg", 
        category: "Prints",
        categoryId: "prints",
        id: `chicken-eats-its-own-leg-${uniqid()}`, 
        price: {
            fullSize: 200.00,
            halfSize: 125.00,
            frame: 150.00, 
        },
        imgPreview: productImages['chickeneatsitsownleg.jpg'], 
        imgExamples: []
    },
    {
        name: "Eggllusion Woodcut", 
        category: "Prints",
        categoryId: "prints",
        id: `eggllusion-woodcut-${uniqid()}`, 
        price: {
            smallSize: 400.00,
            largeSize: 1000.00, 
            frame: 250.00, 
            extra: 200.00
        },
        imgPreview: productImages["eggllusion.PNG"], 
        imgExamples: [productImages['eggwoodcut']]
    },
    {
        name: "The Illusion", 
        category: "Prints",
        categoryId: "prints",
        id: `illusion-${uniqid()}`, 
        price: {
            print: 300.00, 
            frame: 200.00, 
            lifeSize: 300.00,
        },
        imgPreview: productImages["illusion.jpg"], 
        imgExamples: []
    },
    {
        name: "Internet Wars", 
        category: "Prints",
        categoryId: "prints",
        id: `internet-wars-${uniqid()}`, 
        price: {
            fullSize: 200.00,
            halfSize: 125.00,
            frame: 150.00, 
        },
        imgPreview: productImages["internetwars.jpg"], 
        imgExamples: []
    },
    {
        name: "Visual", 
        category: "Prints",
        categoryId: "prints",
        id: `visual-${uniqid()}`, 
        price: {
            print: 150.00, 
            frame: 150.00, 
        },
        imgPreview: productImages["visual.JPG"], 
        imgExamples: []
    }
]

export const merchandise = [
    {
        name: "Art Deck",
        category: "Merchanide",
        categoryId: "merchandise",
        id: `art-deck-${uniqid()}`, 
        price: {
            customDeck: 150.00,
            customGrip: 50.00
        },
        imgPreview: productImages['skateboard.jpg'], 
        imgExamples: [productImages['deckexample.jpg']]
    },
    {
        name: "Art Griptape",
        category: "Merchanide",
        categoryId: "merchandise",
        id: `art-griptape-${uniqid()}`, 
        price: {
            customGrip: 60.00
        },
        imgPreview: productImages['griptape.jpg'], 
        imgExamples: [productImages['gripexample.jpg']]
    },
]

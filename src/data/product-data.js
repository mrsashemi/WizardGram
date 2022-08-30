import uniqid from 'uniqid';
import { productImages } from './product-assets';

export const prints = [
    {
        name: "Block Prints",
        class: "blockprint",
        category: "Prints",
        categoryId: "prints",
        id: `block-prints`, 
        price: [["22x30 Print", 100.00], ["Resin Frame", 150.00], ["Detailing", 100.00]],
        imgPreview: productImages['blockprint.jpg'], 
        imgExamples: [productImages['blockexample.jpg'], productImages['block1.jpg'], productImages['block2.jpg']],
        description: 
        `Hand printed woodblock stamp. Choice of 1 ink color on Japanese washi paper.
        If desired, we can add details, colors, or dyes to your print and we do offer options for framing.
        Framed prints are done in the same style as our original work, mounted onto wood and sealed with epoxy resin.
        Keep in mind, epoxy generally alters the color of whatever it is coating. Usually, it results in richer colors. 
        With washi paper, however, the paper generally disolves into the resin and somewhat disappears.
        We personally think the effect is quite magical, but if you aren't interested in a woodgrain background to your print, 
        we can press the print onto thicker paper. 
        If framing or detailing is selected, we will reach out with a follow up email to discuss specifics and turn around times. `,
    },
    {
        name: "The Chicken Eats Its Own Leg", 
        class: "chickeneatsitsownleg",
        category: "Prints",
        categoryId: "prints",
        id: `chicken-eats-its-own-leg`, 
        price: [["24x32 Print", 200.00], ["16x24 Print", 125.00], ["Resin Frame", 150.00]],
        imgPreview: productImages['chickeneatsitsownleg.jpg'], 
        imgExamples: [],
        description: 
        `Professionally reproduction quality print on choice of either hahnemuhle metallic paper or japanese washi.
        Framed prints are done in the same style as our original work, mounted onto wood and sealed with epoxy resin.
        Keep in mind, epoxy generally alters the color of whatever it is coating. Usually, it results in richer colors. 
        With washi paper, however, the paper generally disolves into the resin and somewhat disappears.
        We personally think the effect is quite magical, but if you aren't interested in a woodgrain background to your print, 
        we can press the print onto thicker paper. 
        If framing is selected, we will reach out with a follow up email to discuss specifics and turn around times. `,
    },
    {
        name: "Eggllusion Woodcut", 
        class: "eggllusion",
        category: "Prints",
        categoryId: "prints",
        id: `eggllusion-woodcut`, 
        price: [["22x30 Laser Engraved Woodcut", 500.00], ["33x45 Laser Engraved Woodcut", 1000.00], ["Resin Frame", 250.00], ["Detailing", 200.00]],
        imgPreview: productImages["eggllusion.PNG"], 
        imgExamples: [productImages['eggwoodcut.jpg']],
        description: 
        `This is not a paper print but rather a laser engraved woodcut of our piece "Eggllusion". Choice of 1 color, with options for 2 if desired.
        Framed woodcut will be done in the same style as our original work, sealed with epoxy resin.
        Keep in mind, epoxy generally alters the color of whatever it is coating. Usually, it results in richer colors. 
        If framing is selected, we will reach out with a follow up email to discuss specifics and turn around times. `,
    },
    {
        name: "The Illusion", 
        class: "illusion",
        category: "Prints",
        categoryId: "prints",
        id: `illusion`, 
        price: [["16x40 Print", 250.00], ["24x60 Life-Size Print", 700.00], ["Resin Frame", 150.00]],
        imgPreview: productImages["illusion.jpg"], 
        imgExamples: [],
        description: 
        `Professionally reproduction quality print on choice of either hahnemuhle metallic paper or japanese washi.
        Framed prints are done in the same style as our original work, mounted onto wood and sealed with epoxy resin.
        Keep in mind, epoxy generally alters the color of whatever it is coating. Usually, it results in richer colors. 
        With washi paper, however, the paper generally disolves into the resin and somewhat disappears.
        We personally think the effect is quite magical, but if you aren't interested in a woodgrain background to your print, 
        we can press the print onto thicker paper. 
        If framing is selected, we will reach out with a follow up email to discuss specifics and turn around times. `,
    },
    {
        name: "Internet Wars", 
        class: "internetwars",
        category: "Prints",
        categoryId: "prints",
        id: `internet-wars`, 
        price: [["24x32 Print", 200.00], ["16x24 Print", 125.00], ["Resin Frame", 150.00]],
        imgPreview: productImages["internetwars.jpg"], 
        imgExamples: [],
        description: 
        `Professionally reproduction quality print on choice of either hahnemuhle metallic paper or japanese washi.
        Framed prints are done in the same style as our original work, mounted onto wood and sealed with epoxy resin.
        Keep in mind, epoxy generally alters the color of whatever it is coating. Usually, it results in richer colors. 
        With washi paper, however, the paper generally disolves into the resin and somewhat disappears.
        We personally think the effect is quite magical, but if you aren't interested in a woodgrain background to your print, 
        we can press the print onto thicker paper. 
        If framing is selected, we will reach out with a follow up email to discuss specifics and turn around times. `,
    },
    {
        name: "Visual", 
        class: "visual",
        category: "Prints",
        categoryId: "prints",
        id: `visual`, 
        price: [["24x24 Print", 150.00], ["Resin Frame", 150.00]],
        imgPreview: productImages["visual.jpg"], 
        imgExamples: [],
        description: 
        `Professionally reproduction quality print on choice of either hahnemuhle metallic paper or japanese washi.
        Framed prints are done in the same style as our original work, mounted onto wood and sealed with epoxy resin.
        Keep in mind, epoxy generally alters the color of whatever it is coating. Usually, it results in richer colors. 
        With washi paper, however, the paper generally disolves into the resin and somewhat disappears.
        We personally think the effect is quite magical, but if you aren't interested in a woodgrain background to your print, 
        we can press the print onto thicker paper. 
        If framing is selected, we will reach out with a follow up email to discuss specifics and turn around times. `,
    }
]

export const merchandise = [
    {
        name: "Art Deck",
        class: "artdeck",
        category: "Merchanide",
        categoryId: "merchandise",
        id: `art-deck`, 
        price: [["Custom Deck", 150.00], ["Custom Grip", 50.00]],
        imgPreview: productImages['skateboard.jpg'], 
        imgExamples: [productImages['deckexample.jpg']],
        description: 
        `Choice of readily available image printed onto professional quality blank skateboard. Choice of custom griptape available as well.
        These boards are ready to shred and we personally ride them ourselves.`,
    },
    {
        name: "Art Griptape",
        class: "artgrip",
        category: "Merchanide",
        categoryId: "merchandise",
        id: `art-griptape`, 
        price: [["Custom Grip", 60.00]],
        imgPreview: productImages['griptape.jpg'], 
        imgExamples: [productImages['gripexample.jpg']],
        description: 
        `Choice of readily available image printed onto professional quality griptape.`,
    },
]

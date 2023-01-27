# Live Demo
"test"
https://mrsashemi.github.io/shopping-cart/shopping-cart#/

## Description

A single-page artist website with links to an e-commerce page built with React, and styled with plain CSS. All included imagery is original work created by yours truly, therefore, I am also the copyright holder of the work. 

### Learning Outcomes

This project began as an active learning exercise alongside tutorials on React via the Odin Project. The original project, a shopping cart, was extended into the start of a personal artists website. Many of the creative additions were refactored from older projects written in VanillaJs into React as means of overall becoming more comfortable with learning new frameworks. Therefore, many of the ideas, design, and planning were original and beyond the scope of the original project.

### Features

- Creative homepage simultaneously simulating the interface of an iPad (where a lot of my original artwork is produced) and also simulating my artwork itself.
    - Homepage background simulating Portal, a real-world ineractive, glowing work of art created by Hasib Hashemi and Adeeb Djaward of WizardsRobbingKids. The piece was created using epoxy resin and is actually two different images with a two way mirror in-between. Depending on the level of light. (day or night) hitting the painting, a different image is shown. Using scans of the original art piece, I adapted the homepage background into a digital demonstration of the piece itself. Use the slider above the homepage to simulate daytime and nightime which adjusts the level of light hitting the painting.
    - Various ipad style apps
        - title app, which stays static across the different pages
        - clock app, similar to what is seen on an ipad. Created with react-analog-clock plugin and creatively styled with pieces of original artwork.
        - weather app, refactored image slider/weather app project into small sized app similar to what is seen on an ipad. Able to change all advance the slideshow with a fade effect. The weather app, however, is only ever displaying the weather in Osaka (our favorite place and one of the most inspiring for our artwork).
        - Shop app, styled from pieces of original artwork, links to shop page.
    - Varying levels of opacity across elements of homepage. Our original work is created over layers of transparent epoxy resin. By lowering the opacity, and using glass/blurry effects, the page creates a similar look to our original artwork.
- Simple shoppage resembling artist/NFT e-commerce sites.
    - minimalist design contrasting the homepage
    - filter products by category
    - functional shopping cart but no checkout options (yet)

### Process

- Initial Goal: Create a artist page with react router and implement testing where possible
- Begin by drafting the look of the page on a piece of paper and pick out the individual components
- Homepage first
    - Refactor code from etch-a-sketch project to create the art-simulating background
    - Create the page structure with topbar and apps
    - Topbar to include a clock (like an ipad) and links to shop/about pages
    - Refactor code from weather app project to create the weather app image slider
    - Import images and proper plugins to create the other apps (clock, shop app, title app)
- Upon creating the homepage, take a pause to work on styles and play around with the folder structure. 
    - Use multiple stylesheets for various portions. Use App.css as the master stylesheet to input media queries
    - fix folder structure to include a section for data (product data/images), hooks (custom hooks), pages (main pages), and components (any components linking to main pages)
- Shoppage next
    - Create a simple structure, and use prebuilt components to get a clean page-switch when clicking on shop buttons
    - Create product categories and routes
    - Create data sheet for products to be imported into various shop components
    - First ensure products populate properly into correct categories
    - Next create routes into individual item pages
    - Create add-to-cart functionality and cart page
    - Update functionality to increment cart items or remove them all together

### Challenges

- Difficulty with media queries
    - Although I've become very comfortable with plain CSS since I've used it quite a bit for creative purposes, I've generally stuck with viewport units to get "good-enough" responsiveness for my apps. For this project, I instead brushed up on best practices and switched into em/rem/% and minimal use of viewport units to avoid any bugs. 
    - The styling became a mess and it took some effort to figure out the best approach to improving responsiveness. I found using the master stylesheet (app.css) for just media queries specifically at the root level to be the best approach. Essentially, I created CSS variables at the root, and switch their values using media queries depending on the screen size.
    - Still need to workout the media queries for the shoppage
- Page performance, still needs work
    - Removing unnecessary features when refactoring old code did a great deal to keep the homepage running relatively smoothly
- API Calls, relying on free weather api, still need to work out catch error bug that crashes the page.
    - It is not fixed yet, but would like the text to default to "Loading..." upon catching an error.
- Checkout Page
    - I had several issues getting the cart to update and increment properly. I partially think this may be due to how my data is structured. I ultimately got it to work, but I do belive some kinks still need to be worked out. For example, a quantity tag for my data would help as well as functionality to increment the cart beyond the limit amounts for future products that don't have purchase limits. 

## Future Updates

- Add dock to homepage to complete iPad look
- Update media queries for improved responsiveness
- More apps and pages (about page, contact page, art gallery, etc)
- Improvements to how the shop handles item data
- Better pictures for shop items
- Introducing a backend
- p5js to work in a generative art element to the site
- Further research on frameworks to improve site functionality and performance


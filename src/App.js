import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopPage } from './pages/shoppage/shoppage';
import { Homepage } from './pages/homepage/homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


//Goals: Create a webshop with React Router AND implement testing
//Idea: WizardsRobbingKids art website (homepage) with link to merchandise shop
//Test any component except routes

//Structure:
//Homepage to look like ipad/mac, implement a portal slider for background
//Include an ipad doc linking to portfolio, to shop, to about page
//Dont worry about building out functionality for all the "apps"
//Home component
//a) child component: top bar displaying date/time & "signal/battery"
//b) child components: divs as apps via grid, include a weather app, an about app displaying "Wizards Robbing Kids", to start but no click events for now 
//c) child component: bottom dock with a few app links, specifically route to shop


//Shop should include a handful of categories + ability to add to cart
//Include a contact page for commissions
//Include a privacy policy/about page
//Shop component
//a) child component: top bar to be copied from home, but change symbols to shop related ones (shopping cart)
//b) page will open like an app does, for child components: have some of the apps from home stay above the shop but change them so they appear as shop navigation
//c) child component: shop items to include prints, merchandise, commissions
//d) child component: about page (home should also route here)
//e) child component: shopping cart, slide out 
//d) child component: since the idea is to simulate a website, have where you would otherwise enter a link as the search bar, the placeholder text should be the wizardsrobbingkids.com/shop


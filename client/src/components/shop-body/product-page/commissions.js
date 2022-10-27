export function ShopCommissions() {
    return (
        <div id="productsNotAvailable">
            <p>
            We currently do not have an open commissions portal. Instead, we request any interested clients
            shoot us a message via the form below. Commissions are taken on at a first-come first-serve basis and
            only after an agreement is reached and a contract is signed. We try to get back to our clients as soon as
            possible but feel free to shoot us a direct email or social media DM if we do not respond after 2 weeks. 
            <br></br>
            <br></br>
            There is a $1000.00 minimum on custom work.
            We request 50% of the final commission price up front, and the rest on delivery.
            We also request flexibility regarding turn-around times. Typically, a piece will be completed within a few months to 1 year.
            The time to completion, however, can vary depending on the nature of the piece being made. 
            <br></br>
            <br></br>
            Some of our best work has come through the ideas of our buyers. We would have never made Internet Wars for example!
            We really do love commissions, so we look forward to hearing from you!
            </p>
            <div className="commissionsFormContainer">
                <label>Name</label>
                <input type="text" placeholder="Enter Full Name..." name="name"></input>
                <label>Email</label>
                <input type="email" placeholder="Enter Email..." name="email"></input>
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter Phone..." name="name"></input>
                <label>Pricing Budget</label>
                <input type="number" name="budger" placeholder="Enter Budget..."></input>
                <label>Details</label>
                <textarea placeholder="Please let us know a little about what you're looking for..." rows="4" cols="50"></textarea><br></br>
                <button>Submit</button>
            </div>
        </div>
    )
}
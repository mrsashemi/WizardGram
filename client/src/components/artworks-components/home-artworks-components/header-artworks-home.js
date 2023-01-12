export function ArtworksHomeHeader({onShow}) {
    return (
        <div className="instaUserHeader">
            <h2 className="usernameHeader">Username</h2>
            <div className="headerButtons">
                <button className="postButton" onClick={onShow}>+</button>
                <button className="settingsButton">=</button>
            </div>
        </div>
    )
}
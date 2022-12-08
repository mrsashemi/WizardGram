import useRefreshToken from "../../../hooks/userefresh"

export function InstaHeader({onShow}) {
    const refresh = useRefreshToken();
    return (
        <div className="instaUserHeader">
            <h2 className="usernameHeader">Username</h2>
            <div className="headerButtons">
                <button className="postButton" onClick={onShow}>+</button>
                <button className="settingsButton" onClick={()=>{refresh()}}>=</button>
            </div>
        </div>
    )
}
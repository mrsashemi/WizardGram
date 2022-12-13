import { useRef } from "react";

export function NewPostSelect({setSelectedImage}) {
    const hiddenFileInput = useRef(null);

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    }

    const handleChange = (e) => {
        setSelectedImage(e.target.files[0]);
    }
   

    return (
        <div className="instaUserHeader">
            <button className="usernameHeader" onClick={handleClick}>Select</button>
            <input type="file" onChange={handleChange} ref={hiddenFileInput} style={{display: 'none'}} />
            <div className="headerButtons">
                <button className="postButton">+</button>
                <button className="settingsButton">o</button>
            </div>
        </div>
    )
}
export function PublishContent({newImage, setMessage}) {
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className="createContentContainer">
            <div className="contentImageContainer">
                <img 
                        className={`contentImage ${newImage.fit} ${newImage.filter}`}
                        src={newImage.url} 
                        style={{transform:  `scale(${newImage.scale}) 
                                            translateX(${newImage.posX}%) 
                                            translateY(${newImage.posY}%)
                                            rotate(${newImage.rotate}deg)`, 
                                opacity: `${newImage.opacity}%`,
                                filter: newImage.filter === "no-filter" && 
                                        `brightness(${newImage.brightness}%) 
                                        contrast(${newImage.contrast}%) 
                                        saturate(${newImage.saturate}%) 
                                        grayscale(${newImage.grayscale}%)
                                        sepia(${newImage.sepia}%)
                                        hue-rotate(${newImage.hue}deg)
                                        blur(${newImage.blur}px)`}} 
                        draggable={false}>    
                </img>
                {newImage.vignette &&
                <div className="vignette" style={{boxShadow: `inset 0px 0px ${newImage.vignetteBlur/2.5}px ${newImage.vignetteSpread/2.5}px rgba(0, 0, 0, 0.5)`}}>
                </div>}
            </div>
            <textarea className="contentBox" placeholder="Write caption..." onChange={handleMessageChange}></textarea>
        </div>
    )
}
export function PublishContent({newImage, setMessage, multiples}) {
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div className="createContentContainer">
            <div className="contentImageContainer">
                <img 
                        alt="content to be posted"
                        className={`contentImage ${multiples ? multiples[0].fit : newImage.fit} ${multiples ? multiples[0].filter : newImage.filter}`}
                        src={multiples ? multiples[0].url : newImage.url} 
                        style={{transform:  `scale(${multiples ? multiples[0].scale : newImage.scale}) 
                                            translateX(${multiples ? multiples[0].posX : newImage.posX}%) 
                                            translateY(${multiples ? multiples[0].posY : newImage.posY}%)
                                            rotate(${multiples ? multiples[0].rotate : newImage.rotate}deg)`, 
                                opacity: `${multiples ? multiples[0].opacity : newImage.opacity}%`,
                                filter: (multiples ? multiples[0].filter === "no-filter" : newImage.filter === "no-filter") && 
                                        `brightness(${multiples ? multiples[0].brightness : newImage.brightness}%) 
                                        contrast(${multiples ? multiples[0].contrast : newImage.contrast}%) 
                                        saturate(${multiples ? multiples[0].saturate : newImage.saturate}%) 
                                        grayscale(${multiples ? multiples[0].grayscale : newImage.grayscale}%)
                                        sepia(${multiples ? multiples[0].sepia : newImage.sepia}%)
                                        hue-rotate(${multiples ? multiples[0].hue : newImage.hue}deg)
                                        blur(${multiples ? multiples[0].blur : newImage.blur}px)`}} 
                        draggable={false}>    
                </img>
                {(multiples ? multiples[0].vignette : newImage.vignette) &&
                <div className="vignette" style={{boxShadow: `inset 0px 0px ${multiples ? multiples[0].vignetteBlur/2.5 : newImage.vignetteBlur/2.5}px ${multiples ? multiples[0].vignetteSpread/2.5 : newImage.vignetteSpread/2.5}px rgba(0, 0, 0, 0.5)`}}>
                </div>}
            </div>
            <textarea className="contentBox" placeholder="Write caption..." onChange={handleMessageChange}></textarea>
        </div>
    )
}
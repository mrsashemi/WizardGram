export function EditPostFile({currentImg, objPosX, objPosY, objScale, imgFit, imgFilter}) {
    return (
        <div className="newPostFileContainer">
            <img 
                    className={`newPostFile ${imgFit} ${imgFilter}`}
                    src={currentImg} 
                    style={{objectPosition: `${objPosX}% ${objPosY}%`, transform: `scale(${objScale})`}} 
                    draggable={false}>    
            </img>
        </div>
    )
}
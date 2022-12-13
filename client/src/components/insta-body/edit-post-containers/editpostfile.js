export function EditPostFile({currentImg, objPosX, objPosY, objScale, imgFit}) {
    return (
        <div className="newPostFileContainer">
            <img 
                    className={`newPostFile ${imgFit}`}
                    src={currentImg} 
                    style={{objectPosition: `${objPosX}% ${objPosY}%`, transform: `scale(${objScale})`}} 
                    draggable={false}>    
            </img>
        </div>
    )
}
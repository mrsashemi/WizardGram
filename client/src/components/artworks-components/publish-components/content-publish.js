import { useDispatch, useSelector } from "react-redux";
import { changeNewImageBodyMessage, getNewImage, getNewImageIndex } from "../../../features/posts/newPostSlice";

export function PublishContent() {
    const newImage = useSelector(getNewImage);
    const current = useSelector(getNewImageIndex);
    const dispatch = useDispatch();
    
    const handleMessageChange = (e) => {
        dispatch(changeNewImageBodyMessage(e.target.value));
    }

    return (
        <div className="createContentContainer">
            <div className="contentImageContainer">
                <img 
                        alt="content to be posted"
                        className={`contentImage ${newImage[current].fit} ${newImage[current].filter}`}
                        src={newImage[current].url} 
                        style={{transform:  `scale(${newImage[current].scale}) 
                                            translateX(${newImage[current].posX}%) 
                                            translateY(${newImage[current].posY}%)
                                            rotate(${newImage[current].rotate}deg)`, 
                                opacity: `${newImage[current].opacity}%`,
                                filter: (newImage[current].filter === "no-filter") && 
                                        `brightness(${newImage[current].brightness}%) 
                                        contrast(${newImage[current].contrast}%) 
                                        saturate(${newImage[current].saturate}%) 
                                        grayscale(${newImage[current].grayscale}%)
                                        sepia(${newImage[current].sepia}%)
                                        hue-rotate(${newImage[current].hue}deg)
                                        blur(${newImage[current].blur}px)`}} 
                        draggable={false}>    
                </img>
                {(newImage[current].vignette) &&
                <div className="vignette" style={{boxShadow: `inset 0px 0px ${newImage[current].vignetteBlur/2.5}px ${newImage[current].vignetteSpread/2.5}px rgba(0, 0, 0, 0.5)`}}>
                </div>}
            </div>
            <textarea className="contentBox" placeholder="Write caption..." onChange={handleMessageChange}></textarea>
        </div>
    )
}
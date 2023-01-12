import { useEffect, useState, useCallback, useRef } from "react";
import { PostSlider } from "../sliders/post-slider";

export function EditDisplay({newImage, setNewImage, editRotate, useFilter, multiples, current, setCurrent}) {
    const [start, setStart] = useState(10);
    const [startTimer, setStartTimer] = useState(false);
    const [tile, setTile] = useState("");
    const [scaleReminder, setScaleReminder] = useState(null);
    let timer = undefined;

    useEffect(() => {
        setScaleReminder(newImage.scale)
    }, []);

    useEffect(() => {
        if (startTimer) timer = setTimeout(repeatEvent, start);
    }, [newImage.scale]);

    const adjustPos = (e) => {
        if (tile === "middleMiddle") {
            setNewImage({
                ...newImage,
                scale: newImage.scale+0.01
            })
        };

        if (tile === "middleLeft") {
            setNewImage({
                ...newImage,
                scale: newImage.scale-0.01
            });
        };

        if (tile === "middleRight") {
            setNewImage({
                ...newImage,
                scale: scaleReminder
            });
        };
    };
    

    const repeatEvent = (e) => {
        adjustPos(e);
    };
    
    const mouseDownEvent = (e) => {
        setStartTimer(true);
        setTile(e.target.className);
        repeatEvent(e); 
    };

    const mouseUpEvent = () => {
        setStartTimer(false);
        clearTimeout(timer);
        setStart(10);
    };


    return (
        <div className="newPostFileContainer">
            {
            multiples ? 
            <PostSlider multiples={multiples} useFilter={useFilter} current={current} setCurrent={setCurrent}/>
            : 
            <img 
                className={`newPostFile ${newImage.fit} ${newImage.filter}`}
                src={newImage.url} 
                style={{transform:  `scale(${newImage.scale}) 
                                    translateX(${newImage.posX}%) 
                                    translateY(${newImage.posY}%)
                                    rotate(${newImage.rotate}deg)`, 
                        opacity: `${newImage.opacity}%`,
                        filter: !useFilter && `brightness(${newImage.brightness}%) 
                                contrast(${newImage.contrast}%) 
                                saturate(${newImage.saturate}%) 
                                grayscale(${newImage.grayscale}%)
                                sepia(${newImage.sepia}%)
                                hue-rotate(${newImage.hue}deg)
                                blur(${newImage.blur}px)`}} 
                draggable={false}>    
            </img>
            }
            {editRotate &&
            <div className="invisibleGrid">
                <div className="topRight"></div>
                <div className="topMiddle"></div>
                <div className="topLeft"></div>
                <div className="middleLeft" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="middleMiddle" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="middleRight" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="bottomRight"></div>
                <div className="bottomMiddle"></div>
                <div className="bottomLeft"></div>
            </div>}
            {newImage.vignette &&
            <div className="vignette" style={{boxShadow: `inset 0px 0px ${newImage.vignetteBlur}px ${newImage.vignetteSpread}px rgba(0, 0, 0, 0.5)`}}>
            </div>}
        </div>
    )
}
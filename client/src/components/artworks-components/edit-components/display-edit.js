import { useCallback, useEffect, useRef, useState } from "react";
import { PostSlider } from "../sliders/post-slider";

export function EditDisplay({newImage, setNewImage, editRotate, useFilter, multiples, current, setCurrent, setUseFilter}) {
    const [tile, setTile] = useState("");
    const scaleReminder = useRef(null);
    const timer = useRef(null);
    const start = useRef(10);
    const startTimer = useRef(false);

    const mouseDownEvent = (e) => {
        startTimer.current = true;
        setTile(e.target.className);
        repeatEvent(e); 
    };

    const mouseUpEvent = () => {
        startTimer.current = false;
        clearTimeout(timer.current);
        start.current = 10;
    };

    const repeatEvent = useCallback((e) => {
        if (tile === "middleMiddle") {
            setNewImage(n => ({
                ...n,
                scale: newImage.scale+0.01
            }))
        };

        if (tile === "middleLeft") {
            setNewImage(n => ({
                ...n,
                scale: newImage.scale-0.01
            }));
        };

        if (tile === "middleRight") {
            setNewImage(n => ({
                ...n,
                scale: scaleReminder.current
            }));
        };
    },[tile, setNewImage, newImage.scale]);
    

    useEffect(() => {
        if (startTimer) timer.current = setTimeout(repeatEvent, start.current);
    }, [repeatEvent]);
    

    return (
        <div className="newPostFileContainer">
            {
            multiples ? 
            <PostSlider multiples={multiples} useFilter={useFilter} current={current} setCurrent={setCurrent} setUseFilter={setUseFilter} existing={false}/>
            : 
            <img 
                alt="editing display"
                className={`newPostFile ${newImage.fit} ${newImage.filter}`}
                src={newImage.url} 
                onLoad={() => {scaleReminder.current = newImage.scale}}
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
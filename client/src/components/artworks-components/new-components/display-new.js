import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addMultipleImages, adjustNewImageFit, adjustNewImagePos, cancelMultipleImages, changeImageIndex, getNewImage, getNewImageIndex, getPostMultiple, postMultipleImages } from "../../../features/posts/newPostSlice";

export function NewDisplay() {
    const newImage = useSelector(getNewImage);
    const postMultiple = useSelector(getPostMultiple);
    const imgIndex = useSelector(getNewImageIndex);
    const dispatch = useDispatch();

    const [tile, setTile] = useState("");
    const startTimer = useRef(false);
    const start = useRef(10);
    const timer = useRef(null); 

    const handleFit = () => {
        dispatch(adjustNewImageFit());
    }

    const useMultiple = () => {
        if (postMultiple) {
            dispatch(cancelMultipleImages());
        } else {
            dispatch(addMultipleImages());
        }
    }

    const repeatEvent = useCallback((e) => {
        if (newImage) dispatch(adjustNewImagePos(tile))
    }, [newImage, dispatch, tile])

    useEffect(() => {
        if (startTimer.current) timer.current = setTimeout(repeatEvent, start.current);
    }, [repeatEvent])

    
    const mouseDownEvent = (e) => {
        startTimer.current = true;
        setTile(e.target.className);
        repeatEvent(e); 
    }

    const mouseUpEvent = () => {
        startTimer.current = false;
        clearTimeout(timer.current);
        start.current = 10;
    }

    return (
        <div className="newPostFileContainer">
            {newImage[imgIndex].url
                ? <img 
                    alt="selected file display"
                    className={`newPostFile ${newImage[imgIndex].fit_class}`}
                    src={newImage[imgIndex].url} 
                    style={{transform: `scale(${newImage[imgIndex].scale}) translateX(${newImage[imgIndex].position_x}%) translateY(${newImage[imgIndex].position_y}%)`}} 
                    draggable={false}></img>
                : <img alt="selected file display" className="newPostFile"></img>
            }
            <div className="invisibleGrid">
                <div className="topLeft" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="topMiddle" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="topRight" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="middleLeft" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="middleMiddle" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="middleRight" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="bottomLeft" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="bottomMiddle" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
                <div className="bottomRight" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}></div>
            </div>
            <div className="displayButtonContainer">
                <button className="expandButton" onClick={handleFit}>{`< >`}</button>
                <button className="expandButton" onClick={useMultiple}>{`><`}</button>
            </div>
        </div>
    )
}
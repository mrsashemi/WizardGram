import { useCallback, useEffect, useRef, useState } from "react"

export function NewDisplay({newImage, setNewImage, postMultiple, setPostMultiple}) {
    const [tile, setTile] = useState("");
    const startTimer = useRef(false);
    const start = useRef(10);
    const timer = useRef(null); 

    const handleFit = () => {
        setNewImage({
            ...newImage,
            fit: (newImage.fit === "coverImg") ? "containImg" : "coverImg",
            posX: 0,
            posY: 0,
            scale: 1
        })
    }

    const useMultiple = () => {
        if (postMultiple) setPostMultiple(false);
        else setPostMultiple(true);
    }

    const repeatEvent = useCallback((e) => {
        if (tile === "middleMiddle") {
            setNewImage(n => ({
                ...n,
                scale: newImage.scale+0.01
            }))
        }

        if (tile === "middleLeft") {
            setNewImage(n => ({
                ...n,
                posX: newImage.posX-0.25
            }))
        }

        if (tile === "middleRight") {
            setNewImage(n => ({
                ...n,
                posX: newImage.posX+0.25
            }))
        }

        if (tile === "topMiddle") {
            setNewImage(n => ({
                ...n,
                posY: newImage.posY-0.25
            }))
        }

        if (tile === "bottomMiddle") {
            setNewImage(n => ({
                ...n,
                posY: newImage.posY+0.25
            }))
        }

        if (tile === "topLeft") {
            setNewImage(n => ({
                ...n,
                posY: newImage.posY-0.25,
                posX: newImage.posX-0.25
            }))
        }

        if (tile === "topRight") {
            setNewImage(n => ({
                ...n,
                posY: newImage.posY-0.25,
                posX: newImage.posX+0.25
            }))
        }

        if (tile === "bottomLeft") {
            setNewImage(n => ({
                ...n,
                posY: newImage.posY+0.25,
                posX: newImage.posX-0.25
            }))
        }

        if (tile === "bottomRight") {
            setNewImage(n => ({
                ...n,
                posY: newImage.posY+0.25,
                posX: newImage.posX+0.25
            }))
        }
    }, [newImage.posX, newImage.posY, newImage.scale, setNewImage, tile])

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
            {newImage.url
                ? <img 
                    alt="selected file display"
                    className={`newPostFile ${newImage.fit}`}
                    src={newImage.url} 
                    style={{transform: `scale(${newImage.scale}) translateX(${newImage.posX}%) translateY(${newImage.posY}%)`}} 
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
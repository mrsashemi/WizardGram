import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";

export function NewPostFile({newImage, setNewImage}) {
    const [start, setStart] = useState(10);
    const [startTimer, setStartTimer] = useState(false);
    const [tile, setTile] = useState("");
    let timer = undefined;

    const handleFit = () => {
        setNewImage({
            ...newImage,
            fit: (newImage.fit === "coverImg") ? "containImg" : "coverImg",
            posX: 0,
            posY: 0,
            scale: 1
        })
    }

    useEffect(() => {
        if (startTimer) timer = setTimeout(repeatEvent, start);
    }, [newImage.posX, newImage.posY, newImage.scale])

    const adjustPos = (e) => {
        if (tile === "middleMiddle") {
            setNewImage({
                ...newImage,
                scale: newImage.scale+0.01
            })
        }

        if (tile === "middleLeft") {
            setNewImage({
                ...newImage,
                posX: newImage.posX-0.25
            })
        }

        if (tile === "middleRight") {
            setNewImage({
                ...newImage,
                posX: newImage.posX+0.25
            })
        }

        if (tile === "topMiddle") {
            setNewImage({
                ...newImage,
                posY: newImage.posY-0.25
            })
        }

        if (tile === "bottomMiddle") {
            setNewImage({
                ...newImage,
                posY: newImage.posY+0.25
            })
        }

        if (tile === "topLeft") {
            setNewImage({
                ...newImage,
                posY: newImage.posY-0.25,
                posX: newImage.posX-0.25
            })
        }

        if (tile === "topRight") {
            setNewImage({
                ...newImage,
                posY: newImage.posY-0.25,
                posX: newImage.posX+0.25
            })
        }

        if (tile === "bottomLeft") {
            setNewImage({
                ...newImage,
                posY: newImage.posY+0.25,
                posX: newImage.posX-0.25
            })
        }

        if (tile === "bottomRight") {
            setNewImage({
                ...newImage,
                posY: newImage.posY+0.25,
                posX: newImage.posX+0.25
            })
        }
    }
    

    const repeatEvent = (e) => {
        adjustPos(e);
    }
    
    const mouseDownEvent = (e) => {
        setStartTimer(true);
        setTile(e.target.className);
        repeatEvent(e); 
    }

    const mouseUpEvent = () => {
        setStartTimer(false);
        clearTimeout(timer);
        setStart(10);
    }

    return (
        <div className="newPostFileContainer">
            {newImage.url
                ? <img 
                    className={`newPostFile ${newImage.fit}`}
                    src={newImage.url} 
                    style={{transform: `scale(${newImage.scale}) translateX(${newImage.posX}%) translateY(${newImage.posY}%)`}} 
                    draggable={false}></img>
                : <img className="newPostFile"></img>
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
            <button className="expandButton" onClick={handleFit}>{`< >`}</button>
        </div>
    )
}
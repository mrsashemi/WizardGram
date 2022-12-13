import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";

export function NewPostFile({currentImg, objPosX, setObjPosX, objPosY, setObjPosY, objScale, setObjScale, imgFit, setImgFit}) {
    const [xPos, setXPos] = useState(null);
    const [yPos, setYPos] = useState(null);
    const [leftBound, setLeftBound] = useState(null);
    const [topBound, setTopBound] = useState(null);
    const [start, setStart] = useState(10);
    const [startTimer, setStartTimer] = useState(false);
    let timer = undefined;

    const handleFit = () => {
        if (imgFit === "coverImg") setImgFit("containImg")
        else setImgFit("coverImg")

        setObjScale(1);
        setObjPosX(50);
        setObjPosY(50);
    }

    useEffect(() => {
        if (startTimer) timer = setTimeout(repeatEvent, start);
    }, [objPosX, objPosY, objScale])

    const adjustPos = (e) => {
        let offsetX = xPos - leftBound;
        let halfBound = leftBound/2;

        let offsetY = yPos - topBound;
        let topHalfBound = topBound/2;

        if (offsetX < (halfBound - halfBound/2) && objPosX > 0) {
            setObjPosX(objPosX-1)
        } else if (offsetX > (halfBound + halfBound/2) && objPosX < 100) {
            setObjPosX(objPosX+1)
        }

        if (offsetY < (topBound + topHalfBound) && objPosY > 0) {
            setObjPosY(objPosY-1);
        } else if (offsetY > (topBound*5 + topHalfBound) && objPosY < 100) {
            setObjPosY(objPosY+1);
        } 

        if (offsetX > (halfBound - halfBound/2) && offsetX < (halfBound + halfBound/2) && offsetY > (topBound + topHalfBound) && offsetY < (topBound*5 + topHalfBound)) {
            setObjScale(objScale+0.01)
        }
    }
    

    const repeatEvent = (e) => {
        adjustPos(e);
    }
    
    const mouseDownEvent = (e) => {
        setStartTimer(true);
        setXPos(e.clientX);
        setYPos(e.clientY);
        setLeftBound(e.target.parentElement.getBoundingClientRect().left)
        setTopBound(e.target.parentElement.getBoundingClientRect().top)
        repeatEvent(e); 
    }

    const mouseUpEvent = () => {
        setStartTimer(false);
        clearTimeout(timer);
        setStart(10);
    }

    const findPositions = (e) => {
        setXPos(e.clientX);
        setYPos(e.clientY);
        setLeftBound(e.target.parentElement.getBoundingClientRect().left)
        setTopBound(e.target.parentElement.getBoundingClientRect().top)
    }

    return (
        <div className="newPostFileContainer">
            {currentImg
                ? <img 
                    className={`newPostFile ${imgFit}`}
                    src={currentImg} 
                    style={{objectPosition: `${objPosX}% ${objPosY}%`, transform: `scale(${objScale})`}} 
                    draggable={false}
                    onMouseDown={mouseDownEvent}
                    onMouseUp={mouseUpEvent}
                    onMouseOver={findPositions}></img>
                : <img className="newPostFile"></img>
            }
            <button className="expandButton" onClick={handleFit}>{`< >`}</button>
        </div>
    )
}
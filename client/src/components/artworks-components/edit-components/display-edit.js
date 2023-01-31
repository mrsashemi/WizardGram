import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterUsage, getNewImage, getNewImageIndex, getRotating, manageScaleForRotatedImage } from "../../../features/posts/newPostSlice";
import { ImgContainer } from "../img-component/img-container";
import { PostSlider } from "../sliders/post-slider";

export function EditDisplay() {
    const newImage = useSelector(getNewImage);
    const current = useSelector(getNewImageIndex);
    const editRotate = useSelector(getRotating);
    const useFilter = useSelector(getFilterUsage);

    const dispatch = useDispatch();
    const [tile, setTile] = useState("");
    const scaleReminder = useRef(null);
    const timer = useRef(null);
    const start = useRef(10);
    const startTimer = useRef(false);

    const mouseDownEvent = (e) => {
        startTimer.current = true;
        setTile(e.target.className);
        repeatEvent(e); 
        console.log(tile)
    };

    const mouseUpEvent = () => {
        startTimer.current = false;
        clearTimeout(timer.current);
        start.current = 10;
    };

    const repeatEvent = useCallback((e) => {
        dispatch(manageScaleForRotatedImage([tile, scaleReminder.current]))
    },[tile, newImage[current].scale]);
    

    useEffect(() => {
        if (startTimer) timer.current = setTimeout(repeatEvent, start.current);
    }, [repeatEvent]);
    

    return (
        <div className="newPostFileContainer">
            {
            newImage.length > 1 ? 
            <PostSlider existing={false}/>
            :
            <ImgContainer post={newImage[current]} imgClass={'newPostFile'} render={(selected) => (
                selected.vignette && (
                    <div className="vignette" style={{boxShadow: `inset 0px 0px ${selected.vignette_blur}px ${selected.vignette_spread}px rgba(0, 0, 0, 0.5)`}}></div>
                ) 
            )}/> 
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
        </div>
    )
}
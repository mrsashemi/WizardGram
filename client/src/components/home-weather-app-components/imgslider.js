import React, { useEffect, useState } from "react";
import { weatherImages } from "./weatherassets";

export function WeatherImgSlider() {
    const [index, setIndex] = useState(0);
    const [topOacity, setTopOpacity] = useState(0.25);
    const [bottomOpacity, setBottomOpacity] = useState(0.5);
    const [filmPhotos] = useState([
        {url: weatherImages['blacksandwave.jpg'], id: 0},
        {url: weatherImages['hasibsand.jpg'], id: 1},
        {url: weatherImages['joshuatree.jpg'], id: 2},
        {url: weatherImages['sunsetmaui.jpg'], id: 3},
        {url: weatherImages['adeeb.jpg'], id: 4},
        {url: weatherImages['adeebhokkaido.jpg'], id: 5},
        {url: weatherImages['egguatree.jpg'], id: 6},
        {url: weatherImages['flowerpillow.jpg'], id: 7},
        {url: weatherImages['hakodate.jpg'], id: 8},
        {url: weatherImages['hakodateview.jpg'], id: 9},
        {url: weatherImages['hanacave.jpg'], id: 10},
        {url: weatherImages['hasib.jpg'], id: 11},
        {url: weatherImages['hasibadeeb.jpg'], id: 12},
        {url: weatherImages['hasibandjebbie.jpg'], id: 13},
        {url: weatherImages['hawaiiview.jpg'], id: 14},
        {url: weatherImages['hokkaido.jpg'], id: 15},
        {url: weatherImages['hokkaidoflowers.jpg'], id: 16},
        {url: weatherImages['milad.jpg'], id: 17},
        {url: weatherImages['murakami.jpg'], id: 18},
        {url: weatherImages['osakaman.jpg'], id: 19},
        {url: weatherImages['osakaman2.jpg'], id: 20},
        {url: weatherImages['osaktapus.jpg'], id: 21},
        {url: weatherImages['osaktapus2.jpg'], id: 22},
        {url: weatherImages['sapporo.jpg'], id: 23},
        {url: weatherImages['treestars.jpg'], id: 24},
        {url: weatherImages['stars.jpg'], id: 25}
    ]);

    //In order to create a fading slideshow, use a ref to clear interval
    const timeoutRef = React.useRef(null);
    function resetInterval() {
        if (timeoutRef.current) {
          clearInterval(timeoutRef.current);
        }
    }

    //to fade the image in, useEffect with setInterval once the index of the image changes
    useEffect(() => {
        if (topOacity <= 0) {
            resetInterval();
            timeoutRef.current = setInterval(() => {
                setTopOpacity(prevOpacity => (prevOpacity < 0.25) ? prevOpacity + 0.01 : prevOpacity)
                setBottomOpacity(prevOpacity => (prevOpacity < 0.25) ? prevOpacity + 0.02 : prevOpacity)
            }, 50)
        }

        if (topOacity === 0.25) {
            resetInterval();
        }
        
    }, [index, topOacity]);
    

    //to fade the image out, set an Interval with a local counter variable
    //once the counter hits the desired value, advance the index and clear interval
    function advanceIndex() {
        resetInterval();
        let count = 0;
        timeoutRef.current = setInterval(() => {
            if (topOacity > 0) {
                setTopOpacity((prevOpacity) => (prevOpacity > 0) ? prevOpacity - 0.01 : prevOpacity);
                setBottomOpacity((prevOpacity) => (prevOpacity > 0) ? prevOpacity - 0.02 : prevOpacity);
                count++
            } 
            
            if (count === 25) {
                (index !== filmPhotos.length - 1) ? setIndex(idx => idx + 1) : setIndex(idx => 0)
                resetInterval();
            }
        }, 50);
    }

    function reverseIndex() {
        resetInterval();
        let count = 0;
        timeoutRef.current = setInterval(() => {
            if (topOacity > 0) {
                setTopOpacity((prevOpacity) => (prevOpacity > 0) ? prevOpacity - 0.01 : prevOpacity);
                setBottomOpacity((prevOpacity) => (prevOpacity > 0) ? prevOpacity - 0.01 : prevOpacity);
                count++
            } 
            
            if (count === 25) {
                (index !== 0) ? setIndex(idx => idx - 1) : setIndex(idx => filmPhotos.length - 1);
                resetInterval();
            }
        }, 50);
    }


    return (
        <div id="weatherAppImgSlider">
            <div className="weatherAppBackground" style={{opacity: bottomOpacity, backgroundImage: `url(${filmPhotos[index].url})`}}></div>
            <div className="weatherAppGlass"></div>
            <div className="weatherImgContainer">
                <div className="weatherImgSlider" style={{opacity: topOacity, backgroundImage: `url(${filmPhotos[index].url})`}}></div>
            </div>
            <div className="advanceImgSlider">
                <div id="prev" onClick={reverseIndex}></div>
                <div id="next" onClick={advanceIndex}></div>
            </div>
        </div>
    )
}

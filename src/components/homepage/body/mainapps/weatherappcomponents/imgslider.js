import React, { useEffect, useState } from "react";
import { images } from '../assets';

export function WeatherImgSlider() {
    const [index, setIndex] = useState(0);
    const [topOacity, setTopOpacity] = useState(0.25);
    const [bottomOpacity, setBottomOpacity] = useState(0.5);
    const [filmPhotos, setFilmPhotos] = useState([
        {url: images['blacksandwave.jpg'], id: 0},
        {url: images['hasibsand.jpg'], id: 1},
        {url: images['joshuatree.jpg'], id: 2},
        {url: images['sunsetmaui.jpg'], id: 3},
        {url: images['adeeb.jpg'], id: 4},
        {url: images['adeebhokkaido.jpg'], id: 5},
        {url: images['egguatree.jpg'], id: 6},
        {url: images['flowerpillow.jpg'], id: 7},
        {url: images['hakodate.jpg'], id: 8},
        {url: images['hakodateview.jpg'], id: 9},
        {url: images['hanacave.jpg'], id: 10},
        {url: images['hasib.jpg'], id: 11},
        {url: images['hasibadeeb.jpg'], id: 12},
        {url: images['hasibandjebbie.jpg'], id: 13},
        {url: images['hawaiiview.jpg'], id: 14},
        {url: images['hokkaido.jpg'], id: 15},
        {url: images['hokkaidoflowers.jpg'], id: 16},
        {url: images['milad.jpg'], id: 17},
        {url: images['murakami.jpg'], id: 18},
        {url: images['osakaman.jpg'], id: 19},
        {url: images['osakaman2.jpg'], id: 20},
        {url: images['osaktapus.jpg'], id: 21},
        {url: images['osaktapus2.jpg'], id: 22},
        {url: images['sapporo.jpg'], id: 23},
        {url: images['treestars.jpg'], id: 24},
        {url: images['stars.jpg'], id: 25}
    ]);

    const timeoutRef = React.useRef(null);

    function resetInterval() {
        if (timeoutRef.current) {
          clearInterval(timeoutRef.current);
        }
    }

    useEffect(() => {
        if (topOacity <= 0) {
            resetInterval();
            timeoutRef.current = setInterval(() => {
                setTopOpacity(prevOpacity => (prevOpacity < 0.25) ? prevOpacity + 0.01 : prevOpacity)
                setBottomOpacity(prevOpacity => (prevOpacity < 0.25) ? prevOpacity + 0.02 : prevOpacity)
            }, 50)
        }

        if (topOacity == 0.25) {
            resetInterval();
        }
        
    }, [index]);
    

    function advanceIndex() {
        resetInterval();
        let count = 0;
        timeoutRef.current = setInterval(() => {
            if (topOacity > 0) {
                setTopOpacity((prevOpacity) => (prevOpacity > 0) ? prevOpacity - 0.01 : prevOpacity);
                setBottomOpacity((prevOpacity) => (prevOpacity > 0) ? prevOpacity - 0.02 : prevOpacity);
                count++
            } 
            
            if (count == 25) {
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
            
            if (count == 25) {
                (index !== 0) ? setIndex(idx => idx - 1) : setIndex(idx => filmPhotos.length - 1);
                resetInterval();
            }
        }, 100);
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

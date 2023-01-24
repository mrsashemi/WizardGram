import React, { useState } from "react";

export function PostSlider({multiples, useFilter, current, setCurrent, setUseFilter, existing}) {
    const [curr, setCurr] = useState(0);
    const [hideVignette, setHideVignette] = useState(false) //temporary fix for vignette issue
    const length = multiples.length;

    const nextSlide = () => {
        if(existing) setCurr((curr === length - 1) ? 0 : curr + 1);
        else setCurrent((current === length - 1) ? 0 : current + 1);
    };

    const prevSlide = () => {
        if (existing) setCurr((curr === 0) ? length - 1 : curr - 1);
        else setCurrent((current === 0) ? length - 1 : current - 1);
    }

    const setOptionOnChange = (post, index) => {
        if (existing) setCurr(index)
        else setCurrent(index);

        if (!existing) {
            if (post.filter === "no-filter") {
                setUseFilter(false)
            } else {
                setUseFilter(true)
            }
        }
    }

    return (
        <React.Fragment>
            {existing ?
                <div className="scrollImageContainer" onMouseOver={() => {setHideVignette(true)}} onMouseLeave={() => {setHideVignette(false)}}>
                    <div className="postSliderContainer">
                        <div className="postSliderButtons">
                            <div className="postSliderLeftArrow" onClick={prevSlide}>{'<'}</div>
                            <div  className="postSliderRightArrow" onClick={nextSlide}>{'>'}</div>
                        </div>
                        <div className="pickSlideButtonsContainer">
                            {multiples.map((post, index) => 
                            <div key={index} className="pickSlideButton" onClick={() => setOptionOnChange(post, index)} style={{background: (index === curr) ? 'rgba(0, 21, 252, 0.5)' : 'rgba(255, 255, 255, 0.2)'}}></div>
                            )}
                        </div> 
                        <img 
                            alt={multiples[curr].title}
                            className={`newPostFile ${multiples[curr].fit_class} ${multiples[curr].filter_class}`}
                            src={multiples[curr].img_location} 
                            style={{transform:  `scale(${multiples[curr].scale}) 
                                                translateX(${multiples[curr].position_x}%) 
                                                translateY(${multiples[curr].position_y}%)
                                                rotate(${multiples[curr].rotate}deg)`, 
                                    opacity: `${multiples[curr].opacity}%`,
                                    filter: multiples[curr].filter_class === "no-filter" && 
                                            `brightness(${multiples[curr].brightness}%) 
                                            contrast(${multiples[curr].contrast}%) 
                                            saturate(${multiples[curr].saturate}%) 
                                            grayscale(${multiples[curr].grayscale}%)
                                            sepia(${multiples[curr].sepia}%)
                                            hue-rotate(${multiples[curr].hue}deg)
                                            blur(${multiples[curr].blur}px)`}} 
                            draggable={false}>    
                        </img>
                    </div>
                    {multiples[curr].vignette && !hideVignette &&
                    <div className="vignette" style={{boxShadow: `inset 0px 0px ${multiples[curr].vignette_blur}px ${multiples[curr].vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                    </div>}
                </div>
                :
                <div className="postSliderContainer">
                    <div className="postSliderButtons">
                        <div className="postSliderLeftArrow" onClick={prevSlide}>{'<'}</div>
                        <div  className="postSliderRightArrow" onClick={nextSlide}>{'>'}</div>
                    </div>
                    <div className="pickSlideButtonsContainer">
                        {multiples.map((post, index) => 
                        <div key={index} className="pickSlideButton" onClick={() => setOptionOnChange(post, index)} style={{background: (index === current) ? 'rgba(0, 21, 252, 0.5)' : 'rgba(255, 255, 255, 0.2)'}}></div>
                        )}
                    </div> 
                    <img 
                        alt={multiples[current].url}
                        className={`newPostFile ${multiples[current].fit} ${multiples[current].filter}`}
                        src={multiples[current].url} 
                        style={{transform:  `scale(${multiples[current].scale}) 
                                            translateX(${multiples[current].posX}%) 
                                            translateY(${multiples[current].posY}%)
                                            rotate(${multiples[current].rotate}deg)`, 
                                opacity: `${multiples[current].opacity}%`,
                                filter: !useFilter && `brightness(${multiples[current].brightness}%) 
                                        contrast(${multiples[current].contrast}%) 
                                        saturate(${multiples[current].saturate}%) 
                                        grayscale(${multiples[current].grayscale}%)
                                        sepia(${multiples[current].sepia}%)
                                        hue-rotate(${multiples[current].hue}deg)
                                        blur(${multiples[current].blur}px)`}} 
                        draggable={false}>    
                    </img>
                </div>
            }
        </React.Fragment>
    )
}
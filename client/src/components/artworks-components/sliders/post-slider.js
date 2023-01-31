import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeImageIndex, getFilterUsage, getNewImage, getNewImageIndex, manageFilterUsage } from "../../../features/posts/newPostSlice";

export function PostSlider({multiples, existing}) {
    const newImage = useSelector(getNewImage);
    const current = useSelector(getNewImageIndex);
    const useFilter = useSelector(getFilterUsage)
    const dispatch = useDispatch();

    const [curr, setCurr] = useState(0);
    const length = (multiples) ? multiples.length : newImage.length;

    const nextSlide = () => {
        if(existing) setCurr((curr === length - 1) ? 0 : curr + 1);
        else dispatch(changeImageIndex((current === newImage.length - 1) ? 0 : current + 1))
    };

    const prevSlide = () => {
        if (existing) setCurr((curr === 0) ? length - 1 : curr - 1);
        else dispatch(changeImageIndex((current === 0) ? newImage.length - 1 : current - 1))
    }

    const setOptionOnChange = (post, index) => {
        if (existing) setCurr(index)
        else dispatch(changeImageIndex(index));

        if (!existing) {
            if (post.filter === "no-filter") {
                dispatch(manageFilterUsage(false));
            } else {
                dispatch(manageFilterUsage(true));
            }
        }
    }

    return (
        <React.Fragment>
            {existing ?
                <div className="scrollImageContainer" >
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
                    {multiples[curr].vignette &&
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
                        {newImage.map((post, index) => 
                        <div key={index} className="pickSlideButton" onClick={() => setOptionOnChange(post, index)} style={{background: (index === current) ? 'rgba(0, 21, 252, 0.5)' : 'rgba(255, 255, 255, 0.2)'}}></div>
                        )}
                    </div> 
                    <img 
                        alt={newImage[current].url}
                        className={`newPostFile ${newImage[current].fit_class} ${newImage[current].filter_class}`}
                        src={newImage[current].url} 
                        style={{transform:  `scale(${newImage[current].scale}) 
                                            translateX(${newImage[current].position_x}%) 
                                            translateY(${newImage[current].position_y}%)
                                            rotate(${newImage[current].rotate}deg)`, 
                                opacity: `${newImage[current].opacity}%`,
                                filter: !useFilter && `brightness(${newImage[current].brightness}%) 
                                        contrast(${newImage[current].contrast}%) 
                                        saturate(${newImage[current].saturate}%) 
                                        grayscale(${newImage[current].grayscale}%)
                                        sepia(${newImage[current].sepia}%)
                                        hue-rotate(${newImage[current].hue}deg)
                                        blur(${newImage[current].blur}px)`}} 
                        draggable={false}>    
                    </img>
                </div>
            }
        </React.Fragment>
    )
}
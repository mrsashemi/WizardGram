import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeImageIndex, getFilterUsage, getNewImage, getNewImageIndex, manageFilterUsage } from "../../../features/posts/newPostSlice";
import { ImgContainer } from "../img-component/img-container";

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
            <div className="scrollImageContainer" >
                <div className="postSliderContainer">
                    <div className="postSliderButtons">
                        <div className="postSliderLeftArrow" onClick={prevSlide}>{'<'}</div>
                        <div  className="postSliderRightArrow" onClick={nextSlide}>{'>'}</div>
                    </div>
                    <ImgContainer 
                            post={(multiples) ? multiples[curr] : newImage[current]} 
                            imgClass={'newPostFile'} 
                            all={(multiples) ? multiples : newImage}
                            idx={(multiples) ? curr : current}
                            newImg={(newImage) ? true : false}
                            useFltr={useFilter}
                            slider={(multPosts, currIdx) => (
                                <div className="pickSlideButtonsContainer">
                                    {multPosts.map((post, index) => 
                                    <div key={index} className="pickSlideButton" onClick={() => setOptionOnChange(post, index)} style={{background: (index === currIdx) ? 'rgba(0, 21, 252, 0.5)' : 'rgba(255, 255, 255, 0.2)'}}></div>
                                    )}
                                </div> 
                            )}
                            render={(selected) => (
                                selected.vignette && (
                                    <div className="vignette" style={{boxShadow: `inset 0px 0px ${selected.vignette_blur}px ${selected.vignette_spread}px rgba(0, 0, 0, 0.5)`}}></div>
                                ) 
                    )}/> 
                </div>
            </div>
        </React.Fragment>
    )
}
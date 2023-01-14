export function PostSlider({multiples, useFilter, current, setCurrent, setUseFilter}) {
    const length = multiples.length;

    const nextSlide = () => {
        setCurrent((current === length - 1) ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent((current === 0) ? length - 1 : current - 1);
    }

    const setOptionOnChange = (post, index) => {
        setCurrent(index);
        if (post.filter === "no-filter") {
            setUseFilter(false)
        } else {
            setUseFilter(true)
        }
    }

    return (
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
    )
}
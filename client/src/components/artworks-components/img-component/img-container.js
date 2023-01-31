import React from "react";


export function ImgContainer({post, render, imgClass, slider, all, idx, newImg, useFltr}) {

    return (
        <React.Fragment>
            {slider && all && idx && slider(all, idx)}
            <img    alt={post.title}
                    src={(post.img_location) ? post.img_location : post.url} 
                    id={`gridimg-${post.post_id}`}
                    className={`${imgClass} ${post.filter_class} ${post.fit_class}`}
                    style={{transform:  `scale(${post.scale}) 
                                    translateX(${post.position_x}%) 
                                    translateY(${post.position_y}%)
                                    rotate(${post.rotate}deg)`, 
                            opacity: `${post.opacity}%`,
                            filter: (newImg && !useFltr) || (!newImg && post.filter_class === "no-filter") && 
                                    `brightness(${post.brightness}%) 
                                    contrast(${post.contrast}%) 
                                    saturate(${post.saturate}%) 
                                    grayscale(${post.grayscale}%)
                                    sepia(${post.sepia}%)
                                    hue-rotate(${post.hue}deg)
                                    blur(${post.blur}px)`}}
                    draggable={false}>
            </img>
            {render(post)}
        </React.Fragment>
    )
}
import { useState } from "react"

export function InstaGrid({allPosts}) {
    const [hover, setHover] = useState(false);

    return (
        <div className="instaGridContainer">
            <div className="gridSwitch">
                <button>+</button>
                <button>v</button>
                <button>o</button>
            </div>
            <div className="instaGrid">
                <div className="instaGrid">
                    {allPosts && allPosts.slice(0).reverse().map((post) => 
                        <div key={post.post_id} className="gridImageContainer">
                            <img 
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                src={post.img_location} 
                                className={`gridPage ${post.filter_class}`}
                                style={{transform:  `scale(${post.scale}) 
                                                translateX(${post.position_x}%) 
                                                translateY(${post.position_y}%)
                                                rotate(${post.rotate}deg)`, 
                                    opacity: `${post.opacity}%`,
                                    filter: post.filter_class === "no-filter" && 
                                            `brightness(${post.brightness}%) 
                                            contrast(${post.contrast}%) 
                                            saturate(${post.saturate}%) 
                                            grayscale(${post.grayscale}%)
                                            sepia(${post.sepia}%)
                                            hue-rotate(${post.hue}deg)
                                            blur(${post.blur}px)`}}>
                            </img>
                            {post.vignette &&
                            <div className="vignette" style={{boxShadow: `inset 0px 0px ${post.vignette_blur/2.5}px ${post.vignette_spread/2.5}px rgba(0, 0, 0, 0.5)`}}>
                            </div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
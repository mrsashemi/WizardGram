import { useEffect, useRef, useState } from "react";
import axios, { axiosPrivate } from "../../../api/axios";

export function AllScroll({selectedIndex, onShow, setPostId, setSelectedIndex, hashMap, setHashMap}) {    
    // scroll to selected post upon loading page
    const scrollToPost = (e, index) => {
        if (index === selectedIndex) e.target.scrollIntoView();
    }

    // open the modify post modal
    const openModal = (postId, postIndex) => {
        setSelectedIndex(postIndex);
        setPostId(postId);
        onShow();
    } 

    // call updatePost controller to increment likes
    const incrementLikes = async (e, index, post) => {
        try {
            const result = await axios.put(`/posts/update-post/${post.post_id}`, 
                JSON.stringify({
                    body: post.body,
                    theme_id: post.theme_id,
                    title: post.title,
                    date_updated: post.date_updated,
                    likes: (e.target.style.background === 'white') ? post.likes+1 : post.likes-1,
                    show_likes: post.show_likes,
                    archived: post.archived
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            if (result) {
                let tempArray = hashMap.get(post.post_id);
                tempArray[0].likes = (e.target.style.background === 'white') ? post.likes+1 : post.likes-1;
                e.target.style.background = (e.target.style.background === 'white') ? 'red' : 'white';
                setHashMap(new Map(hashMap.set(post.post_id, tempArray)));
            }
        } catch (error) {
            console.log("updatePost", error);
        }
    }

    return (
        <div className="instaScroll">
            {hashMap && [...hashMap.keys()].filter(k => hashMap.get(k)[0].archived === false).map((k, index) => 
                <div 
                key={hashMap.get(k)[0].post_id} 
                className='scrollPostContainer'
                id={index}
                onLoad={(e) => {scrollToPost(e, index)}}>
                    <div  className="individualPostHeader">
                        <div className="individualPostProfile">
                            <div className="individualPostProfilePic"></div>
                            <h4 className="usernameHeader">Username</h4>
                        </div>
                        <button className="editPost" onClick={() => {openModal(hashMap.get(k)[0].post_id, index)}}>...</button>
                    </div>
                    <div className="scrollImageContainer">
                        <img 
                                src={hashMap.get(k)[0].img_location} 
                                className={`scrollPage ${hashMap.get(k)[0].filter_class} ${hashMap.get(k)[0].fit_class}`}
                                style={{transform:  `scale(${hashMap.get(k)[0].scale}) 
                                                translateX(${hashMap.get(k)[0].position_x}%) 
                                                translateY(${hashMap.get(k)[0].position_y}%)
                                                rotate(${hashMap.get(k)[0].rotate}deg)`, 
                                        opacity: `${hashMap.get(k)[0].opacity}%`,
                                        filter: hashMap.get(k)[0].filter_class === "no-filter" && 
                                            `brightness(${hashMap.get(k)[0].brightness}%) 
                                            contrast(${hashMap.get(k)[0].contrast}%) 
                                            saturate(${hashMap.get(k)[0].saturate}%) 
                                            grayscale(${hashMap.get(k)[0].grayscale}%)
                                            sepia(${hashMap.get(k)[0].sepia}%)
                                            hue-rotate(${hashMap.get(k)[0].hue}deg)
                                            blur(${hashMap.get(k)[0].blur}px)`}}>
                            </img>
                            {hashMap.get(k)[0].vignette &&
                            <div className="vignette" style={{boxShadow: `inset 0px 0px ${hashMap.get(k)[0].vignette_blur}px ${hashMap.get(k)[0].vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                            </div>}
                    </div>
                    <div className="scrollPostLikesAndComment">
                        {hashMap.get(k)[0].show_likes && <div className="postLikes">
                            <button style={{background: `white`}} onClick={(e) => {incrementLikes(e, index, hashMap.get(k)[0])}}>Heart</button>
                            <div>{hashMap.get(k)[0].likes} likes</div>
                        </div>}
                        {hashMap.get(k)[0].body && <div className="postComment">
                            <h4 className="usernameHeader">Username</h4>
                            <p className="usernameHeader">{hashMap.get(k)[0].body}</p>
                        </div>}
                    </div>
                </div>
            )}
        </div>
    )
}
import { useEffect, useRef, useState } from "react";
import axios, { axiosPrivate } from "../../../api/axios";

export function AllScroll({allPosts, setAllPosts, selectedIndex, onShow, setPostId, setSelectedIndex}) {    
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
                let tempPostsArray = allPosts.slice();
                tempPostsArray[index].likes = (e.target.style.background === 'white') ? post.likes+1 : post.likes-1;
                e.target.style.background = (e.target.style.background === 'white') ? 'red' : 'white';
                setAllPosts(tempPostsArray);
            }
        } catch (error) {
            console.log("updatePost", error);
        }
    }

    return (
        <div className="instaScroll">
            {allPosts && allPosts.filter(post => post.archived === false).map((post, index) => 
                <div 
                key={post.post_id} 
                className='scrollPostContainer'
                id={index}
                onLoad={(e) => {scrollToPost(e, index)}}>
                    <div  className="individualPostHeader">
                        <div className="individualPostProfile">
                            <div className="individualPostProfilePic"></div>
                            <h4 className="usernameHeader">Username</h4>
                        </div>
                        <button className="editPost" onClick={() => {openModal(post.post_id, index)}}>...</button>
                    </div>
                    <div className="scrollImageContainer">
                        <img 
                                src={post.img_location} 
                                className={`scrollPage ${post.filter_class} ${post.fit_class}`}
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
                            <div className="vignette" style={{boxShadow: `inset 0px 0px ${post.vignette_blur}px ${post.vignette_spread}px rgba(0, 0, 0, 0.5)`}}>
                            </div>}
                    </div>
                    <div className="scrollPostLikesAndComment">
                        {post.show_likes && <div className="postLikes">
                            <button style={{background: `white`}} onClick={(e) => {incrementLikes(e, index, post)}}>Heart</button>
                            <div>{post.likes} likes</div>
                        </div>}
                        {post.body && <div className="postComment">
                            <h4 className="usernameHeader">Username</h4>
                            <p className="usernameHeader">{post.body}</p>
                        </div>}
                    </div>
                </div>
            )}
        </div>
    )
}
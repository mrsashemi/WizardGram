import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import { PostScrollHeader } from "./scroll-post-containers/postscrollheader";
import { EditSingleHeader } from "./single-post-container/editsingleheader";
import { EditSinglePost } from "./single-post-container/editsinglepost";
import { SingleInstaPost } from "./single-post-container/singleinstapost";

export function SinglePostBody() {
    const [
        newImage, setNewImage, 
        allPosts, setAllPosts, 
        isExpanded, 
        expandImage, 
        singlePost, 
        selectedIndex, setSelectedIndex, 
        editing, setEditing
    ] = useOutletContext();
    const [message, setMessage] = useState(null)

    return (
        <React.Fragment>
            {editing
            ? <div id="instaUserDashboard">
                <EditSingleHeader post={allPosts[selectedIndex]} message={message} allPosts={allPosts} setAllPosts={setAllPosts} selectedIndex={selectedIndex} />
                <EditSinglePost post={allPosts[selectedIndex]} setMessage={setMessage} message={message} />
            </div>
            : <div id="instaUserDashboard">
                <PostScrollHeader />
                <SingleInstaPost post={singlePost}/>
            </div>}
        </React.Fragment>
    )
}
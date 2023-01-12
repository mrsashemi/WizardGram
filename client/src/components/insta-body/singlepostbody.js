import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import { ExistingPostModal } from "./modals/existingpostmodal";
import { PostScrollHeader } from "./scroll-post-containers/postscrollheader";
import { EditSingleHeader } from "./single-post-container/editsingleheader";
import { EditSinglePost } from "./single-post-container/editsinglepost";
import { SingleInstaPost } from "./single-post-container/singleinstapost";

export function SinglePostBody() {
    const [message, setMessage] = useState(null);
    const [postIndex, setPostIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [
        newImage, setNewImage, 
        allPosts, setAllPosts, 
        isExpanded, 
        expandImage, 
        singlePost, 
        selectedIndex, setSelectedIndex, 
        editing, setEditing
    ] = useOutletContext();

    function showPostModal() {
        setShowModal(true);
        setEditing(true)
    }

    function hidePostModal() {
        setShowModal(false);
        setEditing(false);
    }


    return (
        <React.Fragment>
            {editing
            ? <div id="instaUserDashboard">
                <EditSingleHeader 
                    post={allPosts[selectedIndex]} 
                    message={message} 
                    allPosts={allPosts} 
                    setAllPosts={setAllPosts} 
                    selectedIndex={selectedIndex} />
                <EditSinglePost 
                    post={allPosts[selectedIndex]} 
                    setMessage={setMessage} 
                    message={message} />
                <ExistingPostModal 
                    onHide={hidePostModal} 
                    showModal={showModal} 
                    postIndex={postIndex} 
                    setPostIndex={setPostIndex} 
                    allPosts={allPosts} 
                    setAllPosts={setAllPosts} 
                    setEditing={setEditing}
                    editing={editing} />
            </div>
            : <div id="instaUserDashboard">
                <PostScrollHeader />
                <SingleInstaPost 
                    post={singlePost}
                    allPosts={allPosts} 
                    setAllPosts={setAllPosts}
                    selectedIndex={selectedIndex} 
                    onShow={showPostModal} 
                    setPostIndex={setPostIndex} 
                    setSelectedIndex={setSelectedIndex} />
                <ExistingPostModal 
                    onHide={hidePostModal} 
                    showModal={showModal} 
                    postIndex={postIndex} 
                    setPostIndex={setPostIndex} 
                    allPosts={allPosts} 
                    setAllPosts={setAllPosts} 
                    setEditing={setEditing}
                    editing={editing} />
            </div>}
        </React.Fragment>
    )
}
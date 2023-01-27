import React, { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { ExistingModal } from "./modals/existing-modal";
import { AllHeader } from "./all-posts-components/header-all";
import { SingleEditHeader } from "./single-post-components/header-edit-single";
import { SingleModify } from "./single-post-components/modify-single";
import { SingleDisplay } from "./single-post-components/display-single";

export function SinglePost() {
    const [message, setMessage] = useState(null);
    const [postId, setPostId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { singlePost, selectedIndex, setSelectedIndex, editing, setEditing, hashMap, setHashMap } = useOutletContext();

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
                <SingleEditHeader 
                    post={hashMap.get([...hashMap.keys()][selectedIndex])[0]} 
                    message={message} 
                    hashMap={hashMap}
                    setHashMap={setHashMap} />
                <SingleModify
                    post={hashMap.get([...hashMap.keys()][selectedIndex])[0]} 
                    setMessage={setMessage} />
                <ExistingModal 
                    onHide={hidePostModal} 
                    showModal={showModal} 
                    postId={postId} 
                    setPostId={setPostId} 
                    setEditing={setEditing}
                    editing={editing} />
            </div>
            : <div id="instaUserDashboard">
                <AllHeader />
                <SingleDisplay
                    post={singlePost}
                    onShow={showPostModal} 
                    setPostId={setPostId} 
                    setSelectedIndex={setSelectedIndex} />
                <ExistingModal 
                    onHide={hidePostModal} 
                    showModal={showModal} 
                    postId={postId} 
                    setPostId={setPostId} 
                    setEditing={setEditing}
                    editing={editing} />
            </div>}
        </React.Fragment>
    )
}
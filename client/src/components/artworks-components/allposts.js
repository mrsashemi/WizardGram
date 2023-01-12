import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { ExistingModal } from "./modals/existing-modal";
import { AllScroll } from "./all-posts-components/scroll-all";
import { AllHeader } from "./all-posts-components/header-all";

export function AllPosts() {
    const [postId, setPostId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { allPosts, setAllPosts, selectedIndex, setSelectedIndex, editing, setEditing } = useOutletContext();

    function showPostModal() {
        setShowModal(true);
    }

    function hidePostModal() {
        setShowModal(false);
    }


    return (
        <div id="instaUserDashboard">
            <AllHeader />
            <AllScroll 
                allPosts={allPosts} 
                setAllPosts={setAllPosts} 
                selectedIndex={selectedIndex} 
                onShow={showPostModal} 
                setPostId={setPostId} 
                setSelectedIndex={setSelectedIndex} />
            <ExistingModal 
                onHide={hidePostModal} 
                showModal={showModal} 
                postId={postId} 
                setPostId={setPostId} 
                allPosts={allPosts} 
                setAllPosts={setAllPosts} 
                setEditing={setEditing} 
                editing={editing}/>
        </div>
    )
}
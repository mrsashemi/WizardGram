import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { ExistingModal } from "./modals/existing-modal";
import { AllScroll } from "./all-posts-components/scroll-all";
import { AllHeader } from "./all-posts-components/header-all";

export function AllPosts() {
    const [postId, setPostId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { selectedIndex, setSelectedIndex, editing, setEditing, currentGrid } = useOutletContext();

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
                currentGrid={currentGrid}
                selectedIndex={selectedIndex} 
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
        </div>
    )
}
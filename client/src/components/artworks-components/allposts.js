import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { ExistingModal } from "./modals/existing-modal";
import { AllScroll } from "./all-posts-components/scroll-all";
import { AllHeader } from "./all-posts-components/header-all";

export function AllPosts() {
    const [showModal, setShowModal] = useState(false);

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
                onShow={showPostModal} />
            <ExistingModal 
                onHide={hidePostModal} 
                showModal={showModal} />
        </div>
    )
}
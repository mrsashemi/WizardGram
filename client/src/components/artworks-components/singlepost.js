import React, { useState } from "react";
import { ExistingModal } from "./modals/existing-modal";
import { AllHeader } from "./all-posts-components/header-all";
import { SingleEditHeader } from "./single-post-components/header-edit-single";
import { SingleModify } from "./single-post-components/modify-single";
import { AllScroll } from "./all-posts-components/scroll-all";
import { useSelector } from "react-redux";
import { getEditing } from "../../features/posts/getAllPostsSlice";

export function SinglePost() {
    const editing = useSelector(getEditing);
    const [showModal, setShowModal] = useState(false);

    function showPostModal() {
        setShowModal(true);
    }

    function hidePostModal() {
        setShowModal(false);
    }


    return (
        <React.Fragment>
            {editing
            ? <div id="instaUserDashboard">
                <SingleEditHeader />
                <SingleModify />
                <ExistingModal 
                    onHide={hidePostModal} 
                    showModal={showModal} />
            </div>
            : <div id="instaUserDashboard">
                <AllHeader />
                <AllScroll 
                    onShow={showPostModal} />
                <ExistingModal 
                    onHide={hidePostModal} 
                    showModal={showModal} />
            </div>}
        </React.Fragment>
    )
}
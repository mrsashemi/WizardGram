import React, { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { ExistingModal } from "./modals/existing-modal";
import { AllHeader } from "./all-posts-components/header-all";
import { SingleEditHeader } from "./single-post-components/header-edit-single";
import { SingleModify } from "./single-post-components/modify-single";
import { AllScroll } from "./all-posts-components/scroll-all";
import { useDispatch, useSelector } from "react-redux";
import { editSinglePost, getEditing } from "../../features/posts/getAllPostsSlice";

export function SinglePost() {
    const editing = useSelector(getEditing);
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    function showPostModal() {
        setShowModal(true);
        dispatch(editSinglePost(true));
    }

    function hidePostModal() {
        setShowModal(false);
        dispatch(editSinglePost(false));
    }


    return (
        <React.Fragment>
            {editing
            ? <div id="instaUserDashboard">
                <SingleEditHeader 
                    message={message} />
                <SingleModify
                    setMessage={setMessage} />
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
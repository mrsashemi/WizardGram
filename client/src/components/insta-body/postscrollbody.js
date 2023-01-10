import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { ExistingPostModal } from "./modals/existingpostmodal";
import { AllPostsScroll } from "./scroll-post-containers/allpostsscroll";
import { PostScrollHeader } from "./scroll-post-containers/postscrollheader";

export function PostScrollBody() {
    const [postIndex, setPostIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [
        newImage, setNewImage, 
        allPosts, setAllPosts, 
        isExpanded, 
        expandImage, 
        singlePost, 
        selectedIndex, setSelectedIndex, 
        editing, setEditing] = useOutletContext();

    function showPostModal() {
        setShowModal(true);
    }

    function hidePostModal() {
        setShowModal(false);
    }


    return (
        <div id="instaUserDashboard">
            <PostScrollHeader />
            <AllPostsScroll allPosts={allPosts} selectedIndex={selectedIndex} onShow={showPostModal} setPostIndex={setPostIndex} setSelectedIndex={setSelectedIndex} />
            <ExistingPostModal onHide={hidePostModal} showModal={showModal} postIndex={postIndex} setPostIndex={setPostIndex} allPosts={allPosts} setAllPosts={setAllPosts} setEditing={setEditing} />
        </div>
    )
}
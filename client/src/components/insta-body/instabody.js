import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../../api/axios";
import { InstaGrid } from "./insta-containers/instagrid";
import { InstaHeader } from "./insta-containers/instaheader";
import { InstaHighlights } from "./insta-containers/instahighlights";
import { InstaProfileDescription } from "./insta-containers/instaprofiledesc";
import { InstaProfileImg } from "./insta-containers/instaprofileimg";
import { NewPostModal } from "./modals/newpostmodal";
const GET_ALL_POSTS_URL = '/posts/get-all-fishstaposts'

export function InstaUserBody() {
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
            <InstaHeader onShow={showPostModal} />
            <InstaProfileImg />
            <InstaProfileDescription />
            <InstaHighlights />
            <InstaGrid 
            allPosts={allPosts}
            expandImage={expandImage}
            isExpanded={isExpanded}
            setSelectedIndex={setSelectedIndex}/>
            <NewPostModal 
            onHide={hidePostModal} 
            showModal={showModal} />
        </div>
    )
}
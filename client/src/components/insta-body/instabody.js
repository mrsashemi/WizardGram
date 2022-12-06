import { useState } from "react";
import { InstaGrid } from "./insta-containers/instagrid";
import { InstaHeader } from "./insta-containers/instaheader";
import { InstaHighlights } from "./insta-containers/instahighlights";
import { InstaProfileDescription } from "./insta-containers/instaprofiledesc";
import { InstaProfileImg } from "./insta-containers/instaprofileimg";
import { NewPostModal } from "./modals/newpostmodal";


export function InstaUserBody() {
    const [showModal, setShowModal] = useState(false);

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
            <InstaGrid />
            <NewPostModal onHide={hidePostModal} showModal={showModal} />
        </div>
    )
}
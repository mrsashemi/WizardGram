import { useEffect, useState } from "react";
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
    const [allPosts, setAllPosts] = useState(null);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const result = await axios.get(GET_ALL_POSTS_URL, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                });
                setAllPosts(result.data.postList);
            } catch (error) {
                console.error(error);
            }
        }

        getAllPosts();
    }, []);

    useEffect(() => {
        console.log(allPosts)
    }, [allPosts])

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
            <InstaGrid allPosts={allPosts}/>
            <NewPostModal onHide={hidePostModal} showModal={showModal} />
        </div>
    )
}
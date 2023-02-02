import { useState } from "react";
import { ExistingModal } from "./modals/existing-modal";
import { AllScroll } from "./all-posts-components/scroll-all";
import { AllHeader } from "./all-posts-components/header-all";
import { getCurrentGrid, getPostId, useGetPostsQuery } from "../../features/posts/getAllPostsSlice";
import { useSelector } from "react-redux";

export function AllPosts() {
    const [showModal, setShowModal] = useState(false);
    const currentGrid = useSelector(getCurrentGrid);
    const postId = useSelector(getPostId);

    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery();

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
                onShow={showPostModal}
                posts={posts.entities}
                currentGrid={currentGrid} />
            <ExistingModal 
                onHide={hidePostModal} 
                showModal={showModal}
                selectedId={postId}
                posts={posts.entities} />
        </div>
    )
}
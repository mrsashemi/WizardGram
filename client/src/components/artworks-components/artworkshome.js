import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostsStatus, getAllPostsError, getAllPosts } from "../../features/posts/getAllPostsSlice";
import { ArtworksHomeGrid } from "./home-artworks-components/grid-artworks-home";
import { ArtworksHomeHeader } from "./home-artworks-components/header-artworks-home";
import { ArtworksHomeHighlights } from "./home-artworks-components/highlights-artworks-home";
import { ArtworksHomeDescription } from "./home-artworks-components/description-artworks-home";
import { ArtworksHomeProfilePic } from "./home-artworks-components/profile-pic-artworks-home";
import { CreateModal } from "./modals/create-modal";

export function ArtworksHome() {
    const [showModal, setShowModal] = useState(false);
    const { isExpanded, expandPost, setPostType, currentGrid, setCurrentGrid } = useOutletContext();

    const dispatch = useDispatch();
    const allPostsStatus = useSelector(getAllPostsStatus);
    const getAllError = useSelector(getAllPostsError);

    useEffect(() => {
        if (allPostsStatus === 'idle') {
            dispatch(getAllPosts())
        }
    }, [allPostsStatus, dispatch])


    function showPostModal() {
        setShowModal(true);
    }

    function hidePostModal() {
        setShowModal(false);
    }

    return (
        <div id="instaUserDashboard">
            <ArtworksHomeHeader 
                onShow={showPostModal} />
            <ArtworksHomeProfilePic />
            <ArtworksHomeDescription />
            <ArtworksHomeHighlights />
            <ArtworksHomeGrid 
                expandPost={expandPost}
                isExpanded={isExpanded}
                currentGrid={currentGrid}
                setCurrentGrid={setCurrentGrid} />
            <CreateModal 
                onHide={hidePostModal} 
                showModal={showModal}
                setPostType={setPostType} />
        </div>
    )
}
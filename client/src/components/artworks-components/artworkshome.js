import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../../api/axios";
import { ArtworksHomeGrid } from "./home-artworks-components/grid-artworks-home";
import { ArtworksHomeHeader } from "./home-artworks-components/header-artworks-home";
import { ArtworksHomeHighlights } from "./home-artworks-components/highlights-artworks-home";
import { ArtworksHomeDescription } from "./home-artworks-components/description-artworks-home";
import { ArtworksHomeProfilePic } from "./home-artworks-components/profile-pic-artworks-home";
import { CreateModal } from "./modals/create-modal";
const GET_ALL_POSTS_URL = '/posts/get-all-fishstaposts'

export function ArtworksHome() {
    const [showModal, setShowModal] = useState(false);
    const { allPosts, setAllPosts, isExpanded, expandPost } = useOutletContext();

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const result = await axios.get(GET_ALL_POSTS_URL, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                });
                setAllPosts(result.data.postList.slice(0).reverse());
            } catch (error) {
                console.error(error);
            }
        }

        getAllPosts();
    }, []);

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
                allPosts={allPosts}
                expandPost={expandPost}
                isExpanded={isExpanded} />
            <CreateModal 
                onHide={hidePostModal} 
                showModal={showModal} />
        </div>
    )
}
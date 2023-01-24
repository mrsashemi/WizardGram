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
    const { isExpanded, expandPost, hashMap, setHashMap, setPostType, currentGrid, setCurrentGrid } = useOutletContext();

    // fetch all posts from api
    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const result = await axios.get(GET_ALL_POSTS_URL, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                });

                if (result) {
                    let all = result.data.postList.slice(0).reverse()
                    let hash = new Map();

                    for (let i = 0; i < all.length; i++) {
                        let key = all[i].post_id
                        if (hash.get(key)) {
                            setHashMap(hash.set(key, [...hash.get(key), all[i]]));
                        } else {
                            setHashMap(hash.set(key, [all[i]]));
                        }
                    }

                    return setHashMap(hash);
                }
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
                expandPost={expandPost}
                isExpanded={isExpanded}
                hashMap={hashMap}
                currentGrid={currentGrid}
                setCurrentGrid={setCurrentGrid} />
            <CreateModal 
                onHide={hidePostModal} 
                showModal={showModal}
                setPostType={setPostType} />
        </div>
    )
}
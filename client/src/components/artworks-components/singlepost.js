import React, { useEffect, useState } from "react";
import { ExistingModal } from "./modals/existing-modal";
import { AllHeader } from "./all-posts-components/header-all";
import { SingleEditHeader } from "./single-post-components/header-edit-single";
import { SingleModify } from "./single-post-components/modify-single";
import { AllScroll } from "./all-posts-components/scroll-all";
import { useSelector } from "react-redux";
import { getCurrentGrid, getEditing, getPostId, useGetPostsByIdQuery } from "../../features/posts/getAllPostsSlice";
import { useParams } from "react-router-dom";

export function SinglePost() {
    const { id } = useParams();
    const postId = useSelector(getPostId);
    const editing = useSelector(getEditing);
    const currentGrid = useSelector(getCurrentGrid);
    const [showModal, setShowModal] = useState(false);

    // Strange behavior when accessing the modify post components from the paramsId
    //// accessing paramsId from edit post modal comes up as undefined
    //// It works in all other scenarios, however, posts in cache do not get updated properly 
    //// to solve I am conditionally switching between the id in params and the id stored in state
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByIdQuery((postId) ? postId : id);

    useEffect(() => {
        console.log(posts);
    }, [posts])

    function showPostModal() {
        setShowModal(true);
    }

    function hidePostModal() {
        setShowModal(false);
    }


    return (
             <div id="instaUserDashboard">
                {
                editing ?
                <React.Fragment>
                    <SingleEditHeader
                        posts={posts.entities}
                        id={(postId) ? postId : id} />
                    <SingleModify 
                        posts={posts.entities}
                        id={(postId) ? postId : id}/>
                    <ExistingModal 
                        onHide={hidePostModal} 
                        showModal={showModal}
                        selectedId={(postId) ? postId : id}
                        posts={posts.entities} />
                </React.Fragment>
                :
                isSuccess &&
                <React.Fragment>
                    <AllHeader />
                    <AllScroll 
                        onShow={showPostModal}
                        posts={posts.entities}
                        currentGrid={(currentGrid === posts.entities[id].post[0].post_type) ? 
                                        currentGrid : posts.entities[id].post[0].post_type} />
                    <ExistingModal 
                        onHide={hidePostModal} 
                        showModal={showModal}
                        selectedId={(postId) ? postId : id}
                        posts={posts.entities} />
                </React.Fragment>
                }
            </div>
    )
}
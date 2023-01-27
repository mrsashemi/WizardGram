import React, { useEffect, useRef, useState } from "react";
import { deleteSelectedPost, archiveSelectedPost, hidePostLikes, selectAllPosts } from "../../../features/posts/getAllPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";

export function ExistingModal({onHide, showModal, postId, setPostId, setEditing, editing}) {
    const allPosts = useSelector(selectAllPosts);
    const dispatch = useDispatch();

    const [confirmDelete, setConfirmDelete] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const toPostEdit = () => {
        setEditing(true);
        navigate(`/wizardgram/posts/${postId}`)
    }

    useEffect(() => {
        const handleHide = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onHide && onHide();
                setConfirmDelete(false)
            }
        };

        document.addEventListener('click', handleHide, true);
        return () => {
            document.removeEventListener('click', handleHide, true);
        }

    }, [onHide]);

    const deletePost = async () => {
        try {
            const result = await axiosPrivate.delete(`/posts/delete-post/${postId}`,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            if (result) {
                dispatch(deleteSelectedPost(postId));
                if (!editing) {
                    onHide();
                } else {
                    onHide();
                    return navigate(-1);
                }
            }
        } catch (error) {
            console.log("deletePost", error);
        }
    }



    const archivePost = async () => {
        try {
            const result = await axiosPrivate.put(`/posts/update-post/${postId}`, 
                JSON.stringify({
                    body: allPosts[postId][0].body,
                    theme_id: allPosts[postId][0].theme_id,
                    title: allPosts[postId][0].title,
                    date_updated: allPosts[postId][0].date_updated,
                    likes: allPosts[postId][0].likes,
                    show_likes: allPosts[postId][0].show_likes,
                    archived: (allPosts[postId][0].archived) ? false : true
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            if (result) {
                dispatch(archiveSelectedPost(postId));
                setPostId(null);
                onHide();
            }
        } catch (error) {
            console.log("updatePost", error);
        }
   }

    const hideLikes = async () => {   
        try {
            const result = await axiosPrivate.put(`/posts/update-post/${postId}`, 
                JSON.stringify({
                    body: allPosts[postId][0].body,
                    theme_id: allPosts[postId][0].theme_id,
                    title: allPosts[postId][0].title,
                    date_updated: allPosts[postId][0].date_updated,
                    likes: allPosts[postId][0].likes,
                    show_likes: (allPosts[postId][0].show_likes) ? false : true,
                    archived: allPosts[postId][0].archived
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            if (result) {
                dispatch(hidePostLikes(postId));
                onHide();
            }
        } catch (error) {
            console.log("updatePost", error);
        }
   }

    return (
        <React.Fragment>
            {confirmDelete 
            ? <div id="postModalContainer" className={`postModalContainer ${showModal ? 'showModal' : ''}`} ref={modalRef}>
                <div className="modalTitleContainer">
                <div className="modalHideDragBar" onClick={onHide}></div>
                <h3 className="modalTitle">Are You Sure?</h3>
                </div>
                <div className="modalButtonContainer">
                        <button className="modalButton" onClick={() => deletePost()}>Yes</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
                <div className="modalButtonContainer">
                    <button className="modalButton" onClick={() => setConfirmDelete(false)}>No</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
                </div>
            : <div id="postModalContainer" className={`postModalContainer ${showModal ? 'showModal' : ''}`} ref={modalRef}>
                <div className="modalTitleContainer">
                <div className="modalHideDragBar" onClick={onHide}></div>
                <h3 className="modalTitle">Post</h3>
                </div>
                <div className="modalButtonContainer">
                        <button className="modalButton" onClick={() => toPostEdit()}>Edit</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
                <div className="modalButtonContainer">
                    <button className="modalButton" onClick={() => setConfirmDelete(true)}>Delete</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
                <div className="modalButtonContainer">
                    <button className="modalButton" onClick={() => archivePost()}>{(!postId) ? 'Archive' : (allPosts[postId][0].archived) ? 'Unarchive' : 'Archive'}</button> 
                    <div className="modalButtonBottomBar"></div>
                </div>
                <div className="modalButtonContainer">
                    <button className="modalButton" onClick={() => hideLikes()}>{(!postId) ? 'Hide Like Count' : (allPosts[postId][0].show_likes) ? 'Hide Like Count' : 'Show Like Count'}</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
            </div>}
        </React.Fragment>
    )
}
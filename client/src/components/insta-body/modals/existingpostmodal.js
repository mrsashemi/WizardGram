import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";

export function ExistingPostModal({onHide, showModal, postIndex, setPostIndex, allPosts, setAllPosts, setEditing, editing}) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const toPostEdit = () => {
        setEditing(true);
        navigate(`/fishstagram/posts/${postIndex.id}`)
    }

    useEffect(() => {
        const handleHide = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onHide && onHide();
                setPostIndex(null)
                setConfirmDelete(false)
            }
        };

        document.addEventListener('click', handleHide, true);
        return () => {
            document.removeEventListener('click', handleHide, true);
        }

    }, [onHide]);

    const deletePost = async () => {
        let tempPostsArray = allPosts.slice();
        let position = tempPostsArray.map(post => post.post_id).indexOf(postIndex.id)

        try {
            const result = await axiosPrivate.delete(`/posts/delete-post/${postIndex.id}`,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(result)
            if (result) {
                tempPostsArray.splice(position, 1);
                setAllPosts(tempPostsArray)
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
        let tempPostsArray = allPosts.slice();
        let position = tempPostsArray.map(post => post.post_id).indexOf(postIndex.id)
        console.log(postIndex, position)

        try {
            const result = await axiosPrivate.put(`/posts/update-post/${postIndex.id}`, 
                JSON.stringify({
                    body: allPosts[position].body,
                    theme_id: allPosts[position].theme_id,
                    title: allPosts[position].title,
                    date_updated: allPosts[position].date_updated,
                    likes: allPosts[position].likes,
                    show_likes: allPosts[position].show_likes,
                    archived: (allPosts[position].archived) ? false : true
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(result) 
            if (result) {
                tempPostsArray[position].archived = (allPosts[position].archived) ? false : true;
                setAllPosts(tempPostsArray);
                setPostIndex(null);
                onHide();
            }
        } catch (error) {
            console.log("updatePost", error);
        }
   }

    const hideLikes = async () => {
        let tempPostsArray = allPosts.slice();
        let position = tempPostsArray.map(post => post.post_id).indexOf(postIndex.id)

        try {
            const result = await axiosPrivate.put(`/posts/update-post/${postIndex.id}`, 
                JSON.stringify({
                    body: allPosts[position].body,
                    theme_id: allPosts[position].theme_id,
                    title: allPosts[position].title,
                    date_updated: allPosts[position].date_updated,
                    likes: allPosts[position].likes,
                    show_likes: (allPosts[position].show_likes) ? false : true,
                    archived: allPosts[position].archived
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(result)
            if (result) {
                tempPostsArray[position].show_likes = (allPosts[position].show_likes) ? false : true;
                setAllPosts(tempPostsArray);
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
                    <button className="modalButton" onClick={() => archivePost()}>{(!postIndex) ? 'Archive' : (allPosts[allPosts.map(post => post.post_id).indexOf(postIndex.id)].archived) ? 'Unarchive' : 'Archive'}</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
                <div className="modalButtonContainer">
                    <button className="modalButton" onClick={() => hideLikes()}>{(!postIndex) ? 'Hide Like Count' : (allPosts[allPosts.map(post => post.post_id).indexOf(postIndex.id)].show_likes) ? 'Hide Like Count' : 'Show Like Count'}</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
            </div>}
        </React.Fragment>
    )
}
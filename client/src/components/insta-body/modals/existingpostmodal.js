import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";

export function ExistingPostModal({onHide, showModal, postIndex, setPostIndex, allPosts, setAllPosts, setEditing}) {
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
        try {
            const result = await axiosPrivate.delete(`/posts/delete-post/${postIndex.id}`,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(result)
            if (result) {
                allPosts.splice(postIndex.index, 1);
                setAllPosts(allPosts)
                onHide();
            }
        } catch (error) {
            if (error.response.status === 500) {
                setErrMsg("Database Error");
            } else if (error.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Failed")
            }

            console.log("deletePost", error);
        }
    }



   const archivePost = async () => {

   }

   const hideLikes = async () => {

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
                    <button className="modalButton">Archive</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
                <div className="modalButtonContainer">
                    <button className="modalButton">Hide Like Count</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
            </div>}
        </React.Fragment>
    )
}
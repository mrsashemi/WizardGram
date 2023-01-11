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
        try {
            const result = await axiosPrivate.put(`/posts/update-post/${postIndex.id}`, 
                JSON.stringify({
                    body: allPosts[postIndex.index].body,
                    theme_id: allPosts[postIndex.index].theme_id,
                    title: allPosts[postIndex.index].title,
                    date_updated: allPosts[postIndex.index].date_updated,
                    likes: allPosts[postIndex.index].likes,
                    show_likes: allPosts[postIndex.index].show_likes,
                    archived: (allPosts[postIndex.index].archived) ? false : true
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(result) 
            if (result) {
                let tempPostsArray = allPosts.slice();
                tempPostsArray[postIndex.index].archived = (allPosts[postIndex.index].archived) ? false : true;
                setAllPosts(tempPostsArray);
                return navigate('/fishstagram/allposts')
            }
        } catch (error) {
            if (error.response.status === 500) {
                setErrMsg("Database Error");
            } else if (error.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Failed")
            }

            console.log("updatePost", error);
        }
   }

    const hideLikes = async () => {
        const time = new Date().toISOString();

        try {
            const result = await axiosPrivate.put(`/posts/update-post/${postIndex.id}`, 
                JSON.stringify({
                    body: allPosts[postIndex.index].body,
                    theme_id: allPosts[postIndex.index].theme_id,
                    title: allPosts[postIndex.index].title,
                    date_updated: allPosts[postIndex.index].date_updated,
                    likes: allPosts[postIndex.index].likes,
                    show_likes: (allPosts[postIndex.index].show_likes) ? false : true,
                    archived: allPosts[postIndex.index].archived
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(result)
            if (result) {
                let tempPostsArray = allPosts.slice();
                tempPostsArray[postIndex.index].show_likes = (allPosts[postIndex.index].show_likes) ? false : true;
                setAllPosts(tempPostsArray);
                return navigate('/fishstagram/allposts')
            }
        } catch (error) {
            if (error.response.status === 500) {
                setErrMsg("Database Error");
            } else if (error.response.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Failed")
            }

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
                    <button className="modalButton" onClick={() => archivePost()}>{(!postIndex) ? 'Archive' : (allPosts[postIndex.index].archived) ? 'Unarchive' : 'Archive'}</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
                <div className="modalButtonContainer">
                    <button className="modalButton" onClick={() => hideLikes()}>{(!postIndex) ? 'Hide Like Count' : (allPosts[postIndex.index].show_likes) ? 'Hide Like Count' : 'Show Like Count'}</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
            </div>}
        </React.Fragment>
    )
}
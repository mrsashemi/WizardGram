import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";

export function ExistingModal({onHide, showModal, postId, setPostId, setEditing, editing, hashMap, setHashMap}) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const toPostEdit = () => {
        setEditing(true);
        navigate(`/fishstagram/posts/${postId}`)
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

            console.log(result)
            if (result) {
                setHashMap((prevMap) => {
                    const newMap = new Map(prevMap);
                    newMap.delete(postId);
                    return newMap;
                })
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
                    body: hashMap.get(postId)[0].body,
                    theme_id: hashMap.get(postId)[0].theme_id,
                    title: hashMap.get(postId)[0].title,
                    date_updated: hashMap.get(postId)[0].date_updated,
                    likes: hashMap.get(postId)[0].likes,
                    show_likes: hashMap.get(postId)[0].show_likes,
                    archived: (hashMap.get(postId)[0].archived) ? false : true
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(result) 
            if (result) {
                let tempArray = hashMap.get(postId);
                tempArray[0].archived = (hashMap.get(postId)[0].archived) ? false : true;
                setHashMap(new Map(hashMap.set(postId, tempArray)));
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
                    body: hashMap.get(postId)[0].body,
                    theme_id: hashMap.get(postId)[0].theme_id,
                    title: hashMap.get(postId)[0].title,
                    date_updated: hashMap.get(postId)[0].date_updated,
                    likes: hashMap.get(postId)[0].likes,
                    show_likes: (hashMap.get(postId)[0].show_likes) ? false : true,
                    archived: hashMap.get(postId)[0].archived
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(result)
            if (result) {
                let tempArray = hashMap.get(postId);
                tempArray[0].show_likes = (hashMap.get(postId)[0].show_likes) ? false : true;
                setHashMap(new Map(hashMap.set(postId, tempArray)));
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
                    <button className="modalButton" onClick={() => archivePost()}>{(!postId) ? 'Archive' : (hashMap.get(postId)[0].archived) ? 'Unarchive' : 'Archive'}</button> 
                    <div className="modalButtonBottomBar"></div>
                </div>
                <div className="modalButtonContainer">
                    <button className="modalButton" onClick={() => hideLikes()}>{(!postId) ? 'Hide Like Count' : (hashMap.get(postId)[0].show_likes) ? 'Hide Like Count' : 'Show Like Count'}</button>
                    <div className="modalButtonBottomBar"></div>
                </div>
            </div>}
        </React.Fragment>
    )
}
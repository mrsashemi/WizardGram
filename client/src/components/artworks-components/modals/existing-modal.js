import React, { useState } from "react";
import { ModalInfo } from './ModalInfo';
import { getEditing, editSinglePost, useUpdatePostMutation, useDeletePostMutation } from "../../../features/posts/getAllPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function ExistingModal({onHide, showModal, selectedId, posts}) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const editing = useSelector(getEditing);
    const navigate = useNavigate();

    const [updatePost] = useUpdatePostMutation();
    const [removePost] = useDeletePostMutation();
    const dispatch = useDispatch();

    const toPostEdit = () => {
        dispatch(editSinglePost(true));
        onHide();
        navigate(`/wizardgram/posts/${selectedId}`);
    }

    const deletePost = async () => {
        try {
            const result = await removePost({id: selectedId})
            if (result) {
                if (!editing) onHide();
                else {
                    onHide();
                    return navigate(-1);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const archivePost = async () => {
        const time = new Date(Date.now()).toISOString();
        try {
            const result = await updatePost({
                update: {
                    prop: "archived",
                    val: (posts[selectedId].post[0].archived) ? false : true,
                    date: time,
                    post: posts[selectedId].post[0]
                }
            })
            if (result) onHide();
        } catch (error) {
            console.log(error)
        }
    }

    const hideLikes = async () => {   
        const time = new Date(Date.now()).toISOString();
        try {
            const result = await updatePost({
                update: {
                    prop: "showLikes",
                    val: (posts[selectedId].post[0].show_likes) ? false : true,
                    date: time,
                    post: posts[selectedId].post[0]
                }
            })
            if (result) onHide();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ModalInfo 
            showModal={showModal}
            onHide={onHide}
            setConfirmDelete={setConfirmDelete}
            title={confirmDelete ? "Are You Sure?" : "Post"}
            render={() => (
                confirmDelete ? (
                    <React.Fragment>
                        <div className="modalButtonContainer">
                            <button className="modalButton" onClick={() => deletePost()}>Yes</button>
                            <div className="modalButtonBottomBar"></div>
                        </div>
                        <div className="modalButtonContainer">
                            <button className="modalButton" onClick={() => setConfirmDelete(false)}>No</button>
                            <div className="modalButtonBottomBar"></div>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="modalButtonContainer">
                            <button className="modalButton" onClick={() => toPostEdit()}>Edit</button>
                            <div className="modalButtonBottomBar"></div>
                        </div>
                        <div className="modalButtonContainer">
                            <button className="modalButton" onClick={() => setConfirmDelete(true)}>Delete</button>
                            <div className="modalButtonBottomBar"></div>
                        </div>
                        <div className="modalButtonContainer">
                            <button className="modalButton" onClick={() => archivePost()}>{(posts[selectedId]?.post[0]?.archived) ? 'Unarchive' : 'Archive'}</button> 
                            <div className="modalButtonBottomBar"></div>
                        </div>
                        <div className="modalButtonContainer">
                            <button className="modalButton" onClick={() => hideLikes()}>{(posts[selectedId]?.post[0]?.show_likes) ? 'Hide Like Count' : 'Show Like Count'}</button>
                            <div className="modalButtonBottomBar"></div>
                        </div>
                    </React.Fragment>
                )
        )}/>
    )
}
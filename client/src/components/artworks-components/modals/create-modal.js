import React, { useRef } from "react";
import { ModalInfo } from "./ModalInfo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPostType } from "../../../features/posts/newPostSlice";

export function CreateModal({onHide, showModal}) {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const postPhotography = () => {
        dispatch(setPostType("photograph"));
        return navigate("/wizardgram/newpost");
    }

    const postArtworks = () => {
        dispatch(setPostType("artwork"));
        return navigate("/wizardgram/newpost");
    }

    return (
        <ModalInfo 
            showModal={showModal}
            onHide={onHide}
            title={"Create New Post"}
            render={() => (
                <React.Fragment>
                    <div className="modalButtonContainer">
                        <button className="modalButton" onClick={postPhotography}>Photography</button>
                        <div className="modalButtonBottomBar"></div>
                    </div>
                    <div className="modalButtonContainer">
                        <button className="modalButton" onClick={postArtworks}>Artworks</button>
                        <div className="modalButtonBottomBar"></div>
                    </div>
                    <div className="modalButtonContainer">
                        <button className="modalButton">Generative</button>
                        <div className="modalButtonBottomBar"></div>
                    </div>
                </React.Fragment>
        )}/>
    )
}
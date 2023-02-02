import React, { useRef } from "react";
import { ModalInfo } from "./ModalInfo";
import { useNavigate } from "react-router-dom";

export function CreateModal({onHide, showModal, setPostType}) {
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const postPhotography = () => {
        setPostType("photograph")
        return navigate("/wizardgram/newpost");
    }

    const postArtworks = () => {
        setPostType("artwork")
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
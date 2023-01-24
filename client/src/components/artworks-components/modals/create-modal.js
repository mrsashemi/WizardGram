import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function CreateModal({onHide, showModal, setPostType}) {
    const modalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleHide = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onHide && onHide();
            }
        };

        document.addEventListener('click', handleHide, true);
        return () => {
            document.removeEventListener('click', handleHide, true);
        }

    }, [onHide]);

    const postPhotography = () => {
        setPostType("photograph")
        return navigate("/fishstagram/newpost");
    }

    const postArtworks = () => {
        setPostType("artwork")
        return navigate("/fishstagram/newpost");
    }

    return (
        <div id="postModalContainer" className={`postModalContainer ${showModal ? 'showModal' : ''}`} ref={modalRef}>
            <div className="modalTitleContainer">
                <div className="modalHideDragBar" onClick={onHide}></div>
                <h3 className="modalTitle">Create New Post</h3>
            </div>
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
        </div>
    )
}
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function CreateModal({onHide, showModal}) {
    const modalRef = useRef(null);

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

    return (
        <div id="postModalContainer" className={`postModalContainer ${showModal ? 'showModal' : ''}`} ref={modalRef}>
            <div className="modalTitleContainer">
                <div className="modalHideDragBar" onClick={onHide}></div>
                <h3 className="modalTitle">Create</h3>
            </div>
            <div className="modalButtonContainer">
                <Link to="/fishstagram/newpost">
                    <button className="modalButton">Post</button>
                </Link>
                <div className="modalButtonBottomBar"></div>
            </div>
            <div className="modalButtonContainer">
                <button className="modalButton">Reel</button>
                <div className="modalButtonBottomBar"></div>
            </div>
            <div className="modalButtonContainer">
                <button className="modalButton">Highlight</button>
                <div className="modalButtonBottomBar"></div>
            </div>
        </div>
    )
}
import { useEffect, useRef } from "react";

export function ModalInfo({render, showModal, onHide, title, setConfirmDelete}) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleHide = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onHide && onHide();
                setConfirmDelete && setConfirmDelete(false);
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
                <h3 className="modalTitle">{title}</h3>
            </div>
            {render()}
        </div>
    )
}
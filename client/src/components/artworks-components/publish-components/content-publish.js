import { useDispatch, useSelector } from "react-redux";
import { changeNewImageBodyMessage, getNewImage, getNewImageIndex } from "../../../features/posts/newPostSlice";
import { ImgContainer } from "../img-component/img-container";

export function PublishContent() {
    const newImage = useSelector(getNewImage);
    const current = useSelector(getNewImageIndex);
    const dispatch = useDispatch();
    
    const handleMessageChange = (e) => {
        dispatch(changeNewImageBodyMessage(e.target.value));
    }

    return (
        <div className="createContentContainer">
            <div className="contentImageContainer">
                <ImgContainer post={newImage[current]} imgClass={'contentImage'} render={(selected) => (
                    selected.vignette && (
                        <div className="vignette" style={{boxShadow: `inset 0px 0px ${selected.vignette_blur/2.5}px ${selected.vignette_spread/2.5}px rgba(0, 0, 0, 0.5)`}}></div>
                    ) 
                )}/> 
            </div>
            <textarea className="contentBox" placeholder="Write caption..." onChange={handleMessageChange}></textarea>
        </div>
    )
}
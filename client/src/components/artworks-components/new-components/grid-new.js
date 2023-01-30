import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import { cancelMultipleImages, getNewImage, getPostMultiple, updateImageUrlId } from "../../../features/posts/newPostSlice";

export function NewGrid({allImg}) {
    const newImage = useSelector(getNewImage);
    const postMultiple = useSelector(getPostMultiple);
    const dispatch = useDispatch();

    const handleCurrentImage = useCallback((img_location, img_id) => {
        dispatch(updateImageUrlId([img_location, img_id]));
    }, [dispatch])

    return (
        <div className="instaGridContainer" >
            <div className="instaGrid" >
                {allImg && allImg.map((img) => 
                    <div 
                        className="newGridContainer" 
                        key={img && img.img_id}
                        onClick={() => {handleCurrentImage(img.img_location, img.img_id)}}>
                        <img 
                            alt="photography"
                            src={img.img_location} 
                            className="gridImg" ></img>
                            {
                            postMultiple && 
                            <div className={`multiplesMarker ${newImage && ((newImage.map(post => post.id).indexOf(img.img_id) === -1) ? "multiplesGlass" : "multiplesSelected")}`}>
                                {newImage && ((newImage.map(post => post.id).indexOf(img.img_id) === -1) ? "" : newImage.map(post => post.id).indexOf(img.img_id) + 1)}
                            </div>
                            }
                    </div>
                )}
            </div>
        </div>
    )
}
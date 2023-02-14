import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useAddNewImageFileMutation } from "../../../features/posts/imagesSclice";
import { updateImageUrlId } from "../../../features/posts/newPostSlice";

export function NewFileSelect() {
    const hiddenFileInput = useRef(null);
    const dispatch = useDispatch();
    const [addNewPost] = useAddNewImageFileMutation();

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    }

    const handleChange = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const createImg = async () => {
            try {
                const result = await addNewPost({formData});
                if (result) {
                    console.log(result);
                    dispatch(updateImageUrlId([result.data.img_location, result.data.img_id]))  
                }
            } catch (error) {
                console.log(error);
            }
        }
        createImg();
    }
   

    return (
        <div className="instaUserHeader">
            <button className="usernameHeader" onClick={handleClick}>Select</button>
            <input type="file" onChange={handleChange} ref={hiddenFileInput} style={{display: 'none'}} />
            <div className="headerButtons">
                <button className="postButton">+</button>
                <button className="settingsButton">o</button>
            </div>
        </div>
    )
}
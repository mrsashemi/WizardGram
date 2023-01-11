import { Link, useNavigate } from "react-router-dom";

export function EditPostHeader({newImage, setNewImage}) {
    const navigate = useNavigate();

    const toPostSelect = () => {
        if (newImage) {
            setNewImage({
                ...newImage,
                posX: 0,
                posY: 0,
                scale: 1,
                fit: "coverImg",
                filter: "no-filter",
                brightness: 100,
                contrast: 100,
                saturate: 100,
                grayscale: 0,
                sepia: 0,
                hue: 0,
                opacity: 100,
                blur: 0,
                rotate: 0,
                vignette: false,
                vignetteClass: "vignette",
                vignetteBlur: 0,
                vignetteSpread: 0,
                original: true
            })
        }

        return navigate('/fishstagram/newpost');
    }

    return (
        <div className="instaUserHeader">
            <button className="closeNewPost" onClick={() => toPostSelect()}>{`<`}</button>
            <h2>Edit Post</h2>
            <Link to='/fishstagram/createpost'>
                <button className="nextButton">Next</button>
            </Link>
        </div>
    )
}
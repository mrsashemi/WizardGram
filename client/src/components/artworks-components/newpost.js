import { useEffect } from "react";
import { NewDisplay } from "./new-components/display-new";
import { NewGrid } from "./new-components/grid-new";
import { NewHeader } from "./new-components/header-new";
import { NewFileSelect } from "./new-components/file-select-new";
import { useDispatch } from "react-redux";
import { updateImageUrlId } from "../../features/posts/newPostSlice";
import { useGetImagesQuery } from "../../features/posts/imagesSclice";

export function NewPost() {
    const dispatch = useDispatch();

    const {
        data: images,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetImagesQuery();

    // set display image
    useEffect(() => {
        if (isSuccess) dispatch(updateImageUrlId([images.entities[1].images[0].img_location, images.entities[1].images[0].img_id]))
    }, [isSuccess])

    return (
        <div id="instaUserDashboard">
            <NewHeader />
            <NewDisplay />
            <NewFileSelect />
            {isSuccess && <NewGrid 
                allImg={images.entities[1].images} />}
        </div>
    )
}
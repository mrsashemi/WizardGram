import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { EditPostFile } from "./edit-post-containers/editpostfile";
import { EditPostFilters } from "./edit-post-containers/editpostfilters";
import { EditPostHeader } from "./edit-post-containers/editpostheader";
import { EditPostOptions } from "./edit-post-containers/editpostoptions";
import { EditPostSettings } from "./edit-post-containers/editpostsettings";

export function EditPostBody() {
    const [useFilter, setUseFilter] = useState(true);
    const [newImage, setNewImage] = useOutletContext();
    const [editRotate, setEditRotate] = useState(false);

    useEffect(() => {
        if (!useFilter) {
            setNewImage({
                ...newImage,
                filter: "no-filter"
            })
        }
    }, [useFilter])


    return (
        <div id="instaUserDashboard">
            <EditPostHeader />
            <EditPostFile 
                newImage={newImage}
                setNewImage={setNewImage}
                editRotate={editRotate}
                useFilter={useFilter} />
            {useFilter 
                ?<EditPostFilters 
                    newImage={newImage}
                    setNewImage={setNewImage} />
                : <EditPostSettings
                    newImage={newImage}
                    setNewImage={setNewImage}
                    setEditRotate={setEditRotate} />
            }
            <EditPostOptions 
                setUseFilter={setUseFilter}
                setNewImage={setNewImage} />
        </div>
    )
}
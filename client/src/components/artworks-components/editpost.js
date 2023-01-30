import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { changeFilter, getNewImage, getNewImageIndex } from "../../features/posts/newPostSlice";
import { EditDisplay } from "./edit-components/display-edit";
import { EditFilters } from "./edit-components/filters-edit";
import { EditHeader } from "./edit-components/header-edit";
import { EditManual } from "./edit-components/manual-edit";

export function EditPost() {
    const current = useSelector(getNewImageIndex);
    const newImage = useSelector(getNewImage);
    const dispatch = useDispatch();

    const [useFilter, setUseFilter] = useState(true);
    const [editRotate, setEditRotate] = useState(false);

    useEffect(() => {
        if (!useFilter) dispatch(changeFilter("no-filter"));
    }, [useFilter, dispatch])


    return (
        <div id="instaUserDashboard">
            <EditHeader />
            <EditDisplay 
                editRotate={editRotate}
                useFilter={useFilter}
                setUseFilter={setUseFilter} />    
            {useFilter
                ?<EditFilters />
                : <EditManual
                    setEditRotate={setEditRotate} />
            }
            <div className="editOptionsContainer">
                <button className="editButton" onClick={() => {setUseFilter(true)}}>Filters</button>
                <button className="editButton" onClick={() => {setUseFilter(false)}}>Edit</button>
            </div>
        </div>
    )
}
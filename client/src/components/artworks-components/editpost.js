import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getFilterUsage, manageFilterUsage } from "../../features/posts/newPostSlice";
import { EditDisplay } from "./edit-components/display-edit";
import { EditFilters } from "./edit-components/filters-edit";
import { EditHeader } from "./edit-components/header-edit";
import { EditManual } from "./edit-components/manual-edit";

export function EditPost() {
    const useFilter = useSelector(getFilterUsage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!useFilter) dispatch(changeFilter("no-filter"));
    }, [useFilter, dispatch])

    return (
        <div id="instaUserDashboard">
            <EditHeader />
            <EditDisplay />    
            {useFilter
                ?<EditFilters />
                : <EditManual />
            }
            <div className="editOptionsContainer">
                <button className="editButton" onClick={() => {dispatch(manageFilterUsage(true))}}>Filters</button>
                <button className="editButton" onClick={() => {dispatch(manageFilterUsage(false))}}>Edit</button>
            </div>
        </div>
    )
}
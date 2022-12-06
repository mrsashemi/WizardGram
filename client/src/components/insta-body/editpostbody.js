import { EditPostFile } from "./edit-post-containers/editpostfile";
import { EditPostFilters } from "./edit-post-containers/editpostfilters";
import { EditPostHeader } from "./edit-post-containers/editpostheader";
import { EditPostOptions } from "./edit-post-containers/editpostoptions";

export function EditPostBody() {

    return (
        <div id="instaUserDashboard">
            <EditPostHeader />
            <EditPostFile />
            <EditPostFilters />
            <EditPostOptions />
        </div>
    )
}
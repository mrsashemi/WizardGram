import { NewPostFile } from "./new-post-container/newpostfile";
import { NewPostGrid } from "./new-post-container/newpostgrid";
import { NewPostHeader } from "./new-post-container/newpostheader";
import { NewPostSelect } from "./new-post-container/newpostselect";

export function NewPostBody() {

    return (
        <div id="instaUserDashboard">
            <NewPostHeader />
            <NewPostFile />
            <NewPostSelect />
            <NewPostGrid />
        </div>
    )
}
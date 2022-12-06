import { CreatePostContent } from "./create-post-containers/createpostcontent";
import { CreatePostHeader } from "./create-post-containers/createpostheader";
import { CreatePostLinks } from "./create-post-containers/createpostlinks";

export function CreatePostBody() {

    return (
        <div id="instaUserDashboard">
            <CreatePostHeader />
            <CreatePostContent />
            <CreatePostLinks />
        </div>
    )
}
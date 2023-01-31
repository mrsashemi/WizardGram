import { useOutletContext } from "react-router-dom";
import { PublishContent } from "./publish-components/content-publish";
import { PublishHeader } from "./publish-components/header-publish";
import { PublishLinks } from "./publish-components/links-publish";

export function PublishPost() {
    const { postType } = useOutletContext();

    return (
        <div id="instaUserDashboard">
            <PublishHeader 
                postType={postType} />
            <PublishContent />
            <PublishLinks />
        </div>
    )
}
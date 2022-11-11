import { BlogHeader } from "./blogheader";
import { BlogLinks } from "./bloglinks";

export function BlogNav() {
    return (
        <div id="blogPageSideBar">
            <BlogHeader />
            <BlogLinks />
        </div>
    )
}
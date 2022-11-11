import { BlogActivityMenu } from "./activitymenu";
import { BlogSearchMenu } from "./searchmenu";

export function BlogUserMenu() {
    return(
        <div id="blogUserMenu">
            <BlogSearchMenu />
            <BlogActivityMenu />
        </div>
    )
}
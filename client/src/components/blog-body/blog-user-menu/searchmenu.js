import { BlogNotifications } from "./notifications";
import { BlogSearchBar } from "./searchbar";

export function BlogSearchMenu() {
    return (
        <div id="blogSearchMenu">
            <BlogSearchBar />
            <BlogNotifications />
        </div>
    )
}
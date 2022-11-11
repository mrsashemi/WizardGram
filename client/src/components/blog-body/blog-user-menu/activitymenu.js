import { BlogActivity } from "./activity";
import { BlogProfile } from "./profile";

export function BlogActivityMenu() {
    return (
        <div id="blogActivityMenu">
            <BlogProfile />
            <BlogActivity />
        </div>
    )
}
import { BlogNav } from "./blog-nav/blognav";
import { BlogUserMenu } from "./blog-user-menu/usermenu";

export function BlogPageBody() {
    return (
        <div id="blogDashboard">
            <BlogNav />
            <BlogUserMenu />
        </div>
    )
}
import { Link } from "react-router-dom";

export function BlogLinks() {
    return (
        <ul id="blogPageSideLinks">
                <li className="blogLatest" id="blogLatest">Latest</li>
                <li className="blogAllPosts" id="blogAllPosts">All Posts</li>
        </ul>
    )
}
import { SimpleBackground } from "../../components/backgrounds/background";
import { BlogPageBody } from "../../components/blog-body/blogbody";
import { InstaUserBody } from "../../components/insta-body/instabody";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/instagallery.css'

export function InstaGallery() {
    return (
        <div>
            <SimpleBackground />
            <div id="instaGalleryContainer">
                <TopNavBar />
                <InstaUserBody />
            </div>
        </div>
    )
}
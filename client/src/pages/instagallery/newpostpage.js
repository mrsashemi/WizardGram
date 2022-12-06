import { SimpleBackground } from "../../components/backgrounds/background";
import { NewPostBody } from "../../components/insta-body/newpostbody";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/instagallery.css'

export function NewPostPage() {
    return (
        <div>
            <SimpleBackground />
            <div id="instaGalleryContainer">
                <TopNavBar />
                <NewPostBody />
            </div>
        </div>
    )
}
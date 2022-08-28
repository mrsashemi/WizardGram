import './stylesheet/homepage.css'
import { Background } from "../../components/backgrounds/background";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import { PageBody } from "../../components/home-body/homepage-body";

export function Homepage() {

    return (
        <div>
            <Background />
            <div id="homepageContainer">
                <TopNavBar />
                <PageBody />
                <div className="dock"></div>
            </div>
        </div>
    )
}
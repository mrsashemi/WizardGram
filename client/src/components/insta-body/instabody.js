import { InstaGrid } from "./insta-containers/instagrid";
import { InstaHeader } from "./insta-containers/instaheader";
import { InstaHighlights } from "./insta-containers/instahighlights";
import { InstaProfileDescription } from "./insta-containers/instaprofiledesc";
import { InstaProfileImg } from "./insta-containers/instaprofileimg";


export function InstaUserBody() {
    return (
        <div id="instaUserDashboard">
            <InstaHeader />
            <InstaProfileImg />
            <InstaProfileDescription />
            <InstaHighlights />
            <InstaGrid />
        </div>
    )
}
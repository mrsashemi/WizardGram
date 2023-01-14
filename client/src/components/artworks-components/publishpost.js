import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PublishContent } from "./publish-components/content-publish";
import { PublishHeader } from "./publish-components/header-publish";
import { PublishLinks } from "./publish-components/links-publish";

export function PublishPost() {
    const { newImage, setNewImage, multiples } = useOutletContext();
    const [message, setMessage] = useState("");

    return (
        <div id="instaUserDashboard">
            <PublishHeader newImage={newImage} message={message} setNewImage={setNewImage} multiples={multiples} />
            <PublishContent newImage={newImage} setMessage={setMessage}/>
            <PublishLinks />
        </div>
    )
}
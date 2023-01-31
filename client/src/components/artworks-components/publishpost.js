import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { getNewImage } from "../../features/posts/newPostSlice";
import { PublishContent } from "./publish-components/content-publish";
import { PublishHeader } from "./publish-components/header-publish";
import { PublishLinks } from "./publish-components/links-publish";

export function PublishPost() {
    const newImage = useSelector(getNewImage);
    const { setNewImage, multiples, postType } = useOutletContext();
    const [message, setMessage] = useState("");
    const [postTitle, setPostTitle] = useState("wizardgram post");

    return (
        <div id="instaUserDashboard">
            <PublishHeader 
                newImage={newImage} 
                message={message} 
                setNewImage={setNewImage} 
                multiples={multiples} 
                postType={postType} 
                postTitle={postTitle}/>
            <PublishContent />
            <PublishLinks />
        </div>
    )
}
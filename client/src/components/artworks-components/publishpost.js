import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PublishContent } from "./publish-components/content-publish";
import { PublishHeader } from "./publish-components/header-publish";
import { PublishLinks } from "./publish-components/links-publish";

export function PublishPost() {
    const { newImage, setNewImage, multiples, postType } = useOutletContext();
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
            <PublishContent 
                newImage={newImage} 
                setMessage={setMessage} 
                multiples={multiples}/>
            <PublishLinks 
                setPostTitle={setPostTitle} 
                postTitle={postTitle}/>
        </div>
    )
}
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CreatePostContent } from "./create-post-containers/createpostcontent";
import { CreatePostHeader } from "./create-post-containers/createpostheader";
import { CreatePostLinks } from "./create-post-containers/createpostlinks";

export function CreatePostBody() {
    const [
        newImage, setNewImage, 
        allPosts, setAllPosts, 
        isExpanded, 
        expandImage, 
        singlePost, 
        selectedIndex, setSelectedIndex, 
        editing, setEditing] = useOutletContext();
    const [message, setMessage] = useState("");

    return (
        <div id="instaUserDashboard">
            <CreatePostHeader newImage={newImage} message={message}/>
            <CreatePostContent newImage={newImage} setMessage={setMessage}/>
            <CreatePostLinks />
        </div>
    )
}
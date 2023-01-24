export function PublishLinks({setPostTitle, postTitle}) {
    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    }

    return (
        <div className="createPostLinksContainer">
            <div>
                <label>Title:</label>
                <textarea className="titleBox" placeholder={postTitle} onChange={handleTitleChange}></textarea>
            </div>
        </div>
    )
}
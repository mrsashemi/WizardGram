export function NewPostGrid({allImg, newImage, setNewImage}) {

    const handleCurrentImage = (img_location, img_id) => {
        setNewImage({
            ...newImage,
            url: img_location,
            id: img_id
        })
    }

    return (
        <div className="instaGridContainer" >
            <div className="instaGrid" >
                {allImg && allImg.map((img) => 
                    <img 
                        src={img.img_location} 
                        key={img.img_id} 
                        className="gridImg" 
                        onClick={() => {handleCurrentImage(img.img_location, img.img_id)}}></img>
                )}
            </div>
        </div>
    )
}
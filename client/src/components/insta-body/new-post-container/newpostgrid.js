export function NewPostGrid({allImg, setCurrentImg, setCurrentImgId}) {

    const handleCurrentImage = (img_location, img_id) => {
        setCurrentImg(img_location);
        setCurrentImgId(img_id);
        console.log(img_location);
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
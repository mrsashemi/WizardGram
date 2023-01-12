import { useEffect } from "react"

export function NewGrid({allImg, newImage, setNewImage, postMultiple, setPostMultiple, multiples, setMultiples}) {
    const handleCurrentImage = (img_location, img_id) => {
        setNewImage({
            ...newImage,
            url: img_location,
            id: img_id
        })
    }

    useEffect(() => {
        let indexCheck;
        if (postMultiple && multiples) indexCheck = multiples.map(post => post.id).indexOf(newImage.id)

        if (indexCheck === -1) {
            setMultiples([...multiples, newImage]);
        } else if (indexCheck >= 0) {
            setMultiples([...multiples.slice(0, indexCheck), ...multiples.slice(indexCheck+1)])
        }
    }, [newImage])

    useEffect(() => {
        if (multiples && multiples.length === 0) {
            setMultiples(null);
            setPostMultiple(false);
        }
    }, [multiples])

    return (
        <div className="instaGridContainer" >
            <div className="instaGrid" >
                {allImg && allImg.map((img) => 
                    <div 
                        className="newGridContainer" 
                        key={img && img.img_id}
                        onClick={() => {handleCurrentImage(img.img_location, img.img_id)}}>
                        <img 
                            alt="photography"
                            src={img.img_location} 
                            className="gridImg" ></img>
                            {
                            postMultiple && 
                            <div className={`multiplesMarker ${multiples && ((multiples.map(post => post.id).indexOf(img.img_id) === -1) ? "multiplesGlass" : "multiplesSelected")}`}>
                                {multiples && ((multiples.map(post => post.id).indexOf(img.img_id) === -1) ? "" : multiples.map(post => post.id).indexOf(img.img_id) + 1)}
                            </div>
                            }
                    </div>
                )}
            </div>
        </div>
    )
}
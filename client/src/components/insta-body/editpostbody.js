import { useOutletContext } from "react-router-dom";
import { EditPostFile } from "./edit-post-containers/editpostfile";
import { EditPostFilters } from "./edit-post-containers/editpostfilters";
import { EditPostHeader } from "./edit-post-containers/editpostheader";
import { EditPostOptions } from "./edit-post-containers/editpostoptions";

export function EditPostBody() {
    const [
        currentImg, setCurrentImg, 
        currentImgId, setCurrentImgId, 
        objPosX, setObjPosX,
        objPosY, setObjPosY,
        objScale, setObjScale,
        imgFit, setImgFit
    ] = useOutletContext();


    return (
        <div id="instaUserDashboard">
            <EditPostHeader />
            <EditPostFile 
                currentImg={currentImg} 
                objPosX={objPosX}
                objPosY={objPosY}
                objScale={objScale}
                imgFit={imgFit} />
            <EditPostFilters 
                currentImg={currentImg}
                imgFit={imgFit} />
            <EditPostOptions />
        </div>
    )
}
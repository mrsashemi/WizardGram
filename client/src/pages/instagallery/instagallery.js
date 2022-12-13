import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SimpleBackground } from "../../components/backgrounds/background";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/instagallery.css'

export function InstaGallery() {
    const [currentImgId, setCurrentImgId] = useState("");
    const [currentImg, setCurrentImg] = useState(null);
    const [objPosX, setObjPosX] = useState(50);
    const [objPosY, setObjPosY] = useState(50);
    const [objScale, setObjScale] = useState(1);
    const [imgFit, setImgFit] = useState("coverImg");
    const [imgFilter, setImgFilter] = useState("");

    return (
        <div>
            <SimpleBackground />
            <div id="instaGalleryContainer">
                <TopNavBar />
                <Outlet context={
                    [currentImg, setCurrentImg, 
                    currentImgId, setCurrentImgId,
                    objPosX, setObjPosX,
                    objPosY, setObjPosY,
                    objScale, setObjScale,
                    imgFit, setImgFit]} />
            </div>
        </div>
    )
}
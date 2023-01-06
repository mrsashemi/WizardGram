import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { SimpleBackground } from "../../components/backgrounds/background";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/instagallery.css'

export function InstaGallery() {
    const [newImage, setNewImage] = useState({
        id: "",
        url: null,
        posX: 0,
        posY: 0,
        scale: 1,
        fit: "coverImg",
        filter: "no-filter",
        brightness: 100,
        contrast: 100,
        saturate: 100,
        grayscale: 0,
        sepia: 0,
        hue: 0,
        opacity: 100,
        blur: 0,
        rotate: 0,
        vignette: false,
        vignetteClass: "vignette",
        vignetteBlur: 0,
        vignetteSpread: 0,
        original: true
    })

    useEffect(() => {
        if (newImage.filter === "no-filter" 
            && newImage.brightness === 100
            && newImage.contrast === 100
            && newImage.saturate === 100
            && newImage.grayscale === 0
            && newImage.sepia === 0
            && newImage.hue === 0
            && newImage.blur === 0) {
                setNewImage({
                    ...newImage,
                    original: true
                })
            } else {
                setNewImage({
                    ...newImage,
                    original: false
                })
            }
    }, [newImage.filter, newImage.brightness, newImage.contrast, newImage.saturate, newImage.grayscale, newImage.sepia, newImage.hue, newImage.blur])

    return (
        <div>
            <SimpleBackground />
            <div id="instaGalleryContainer">
                <TopNavBar />
                <Outlet context={[newImage, setNewImage]} />
            </div>
        </div>
    )
}
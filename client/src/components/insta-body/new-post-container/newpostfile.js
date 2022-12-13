import { useEffect } from "react"
import { axiosPrivate } from "../../../api/axios";


export function NewPostFile({currentImg, currentImgId}) {

    return (
        <div className="newPostFileContainer">
            {currentImg
                ? <img className="newPostFile" src={currentImg}></img>
                : <img className="newPostFile"></img>
            }
            <button className="expandButton">{`< >`}</button>
        </div>
    )
}
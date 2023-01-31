import { useDispatch, useSelector } from "react-redux";
import { getFilterClasses, getNewImage, getNewImageIndex, selectFilterForNewImage } from "../../../features/posts/newPostSlice";

export function EditFilters() {
    const newImage = useSelector(getNewImage);
    const current = useSelector(getNewImageIndex);
    const filterClasses = useSelector(getFilterClasses);
    const dispatch = useDispatch();

    const handleSaveFilter = (selectedFilter) => {
        dispatch(selectFilterForNewImage(selectedFilter));
    }

    return (
        <div className="filterContainer">
            {filterClasses.map((filter, index) =>
                <div className="filterTile" key={index}>
                    <h5 className="filterTitle">{filter[0]}</h5>
                    <div className="filterSquareContainer">
                        <img 
                            alt={`filter ${filter[0]}`}
                            className={`filterSquare ${newImage[current].fit_class} ${filter[1]}`}
                            style={{transform: `scale(${newImage[current].scale}) translateX(${newImage[current].position_x}px) translateY(${newImage[current].position_y}px)`}} 
                            src={newImage[current].url}
                            onClick={() => {handleSaveFilter(filter[1])}}></img>
                    </div>
                </div>
            )}
        </div>
    )
}
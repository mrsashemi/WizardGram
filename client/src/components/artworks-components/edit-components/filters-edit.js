import { useState } from "react"

export function EditFilters({newImage, setNewImage, multiples, setMultiples, current}) {
    const [filterClasses] = useState([
        ["None", "no-filter"],
        ["1977", "filter-1977"],
        ["Aden", "filter-aden"],
        ["Amaro", "filter-amaro"],
        ["Ashby", "filter-ashby"],
        ["Brannan", "filter-brannan"],
        ["Brooklyn", "filter-brooklyn"],
        ["Charmes", "filter-charmes"],
        ["Crema", "filter-crema"],
        ["Dogpatch", "filter-dogpatch"],
        ["Earlybird", "filter-earlybird"],
        ["Gingham", "filter-gingham"],
        ["Ginza", "filter-ginza"],
        ["Helena", "filter-helena"],
        ["Hudson", "filter-hudson"],
        ["Inkwell", "filter-inkwell"],
        ["Kelvin", "filter-kelvin"],
        ["Kuno", "filter-kuno"],
        ["Lark", "filter-lark"],
        ["Lo-fi", "filter-lofi"],
        ["Ludwig", "filter-ludwig"],
        ["Maven", "filter-maven"],
        ["Mayfair", "filter-mayfair"],
        ["Moon", "filter-moon"],
        ["Nashville", "filter-nashville"],
        ["Perpetua", "filter-perpetua"],
        ["Poprocket", "filter-poprocket"],
        ["Reyes", "filter-reyes"],
        ["Rise", "filter-rise"],
        ["Sierra", "filter-sierra"],
        ["Skyline", "filter-skyline"],
        ["Slumber", "filter-slumber"],
        ["Stinson", "filter-stinson"],
        ["Sutro", "filter-sutro"],
        ["Toaster", "filter-toaster"],
        ["Valencia", "filter-valencia"],
        ["Vesper", "filter-vesper"],
        ["Walden", "filter-walden"],
        ["Willow", "filter-willow"],
        ["X-Pro II", "filter-xpro-ii"]
    ]);

    const handleSaveFilter = (selectedFilter) => {
        if (multiples) {
            let temporaryMultiples = multiples.slice();
            temporaryMultiples[current].filter = selectedFilter;
            setMultiples(temporaryMultiples);
        } else {
            setNewImage({
                ...newImage,
                filter: selectedFilter
            })
        }
    }

    return (
        <div className="filterContainer">
            {filterClasses.map((filter, index) =>
                <div className="filterTile" key={index}>
                    <h5 className="filterTitle">{filter[0]}</h5>
                    <div className="filterSquareContainer">
                        {
                        multiples ?
                        <img 
                            className={`filterSquare ${multiples[current].fit} ${filter[1]}`}
                            style={{transform: `scale(${multiples[current].scale}) translateX(${multiples[current].posX}px) translateY(${multiples[current].posY}px)`}} 
                            src={multiples[current].url}
                            onClick={() => {handleSaveFilter(filter[1])}}></img>
                        :
                        <img 
                            className={`filterSquare ${newImage.fit} ${filter[1]}`}
                            style={{transform: `scale(${newImage.scale}) translateX(${newImage.posX}px) translateY(${newImage.posY}px)`}} 
                            src={newImage.url}
                            onClick={() => {handleSaveFilter(filter[1])}}></img>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}
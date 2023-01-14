import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { EditDisplay } from "./edit-components/display-edit";
import { EditFilters } from "./edit-components/filters-edit";
import { EditHeader } from "./edit-components/header-edit";
import { EditManual } from "./edit-components/manual-edit";

export function EditPost() {
    const [current, setCurrent] = useState(0);
    const [useFilter, setUseFilter] = useState(true);
    const [editRotate, setEditRotate] = useState(false);
    const { newImage, setNewImage, postMultiple, multiples, setMultiples } = useOutletContext();

    useEffect(() => {
        if (!useFilter) {
            if (multiples) {
                let temporaryMultiples = multiples.slice();
                temporaryMultiples[current].filter = "no-filter";
                setMultiples(temporaryMultiples);
            } else {
                setNewImage({
                    ...newImage,
                    filter: "no-filter"
                })
            }
        }
    }, [useFilter])


    return (
        <div id="instaUserDashboard">
            <EditHeader newImage={newImage} setNewImage={setNewImage} />
            <EditDisplay 
                newImage={newImage}
                setNewImage={setNewImage}
                editRotate={editRotate}
                useFilter={useFilter}
                multiples={multiples}
                current={current}
                setCurrent={setCurrent}
                setUseFilter={setUseFilter} />    
            {useFilter
                ?<EditFilters 
                    newImage={newImage}
                    setNewImage={setNewImage}
                    multiples={multiples}
                    setMultiples={setMultiples}
                    current={current} />
                : <EditManual
                    newImage={newImage}
                    setNewImage={setNewImage}
                    multiples={multiples}
                    setMultiples={setMultiples}
                    current={current}
                    setEditRotate={setEditRotate} />
            }
            <div className="editOptionsContainer">
                <button className="editButton" onClick={() => {setUseFilter(true)}}>Filters</button>
                <button className="editButton" onClick={() => {setUseFilter(false)}}>Edit</button>
            </div>
        </div>
    )
}
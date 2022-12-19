export function EditPostOptions({setUseFilter}) {
    
    return (
        <div className="editOptionsContainer">
            <button className="editButton" onClick={() => {setUseFilter(true)}}>Filters</button>
            <button className="editButton" onClick={() => {setUseFilter(false)}}>Edit</button>
        </div>
    )
}
export function BlogSearchBar() {
    return (
        <div id="blogSearchBar">
            <label htmlFor="blogLookup"></label>
            <input type="search" id="blogLookup" placeholder="search blogposts..." data-search></input>
        </div>
    )
}
import { useGetPostsQuery } from "../../../features/posts/getAllPostsSlice"

export function ArtworksHomeProfilePic() {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()


    return (
        <div className="instaProfileImg">
            <img alt="profilepic" className="instaProfilePic"></img>
            <div className="instaProfileStats">
                <div className="profileStats">
                    <h4>{(isSuccess) ? posts.ids.length : 0}</h4>
                    <h4>posts</h4>
                </div>
                <div className="profileStats">
                    <h4>3m</h4>
                    <h4>followers</h4>
                </div>
                <div className="profileStats">
                    <h4>340</h4>
                    <h4>following</h4>
                </div>
            </div>
        </div>
    )
}
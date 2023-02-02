import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SimpleBackground } from "../../components/backgrounds/background";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/artworkspage.css'
import { useDispatch, useSelector } from "react-redux";
import { 
    changeCurrentGrid, 
    editSinglePost, 
    expandSinglePost, 
    extendedApiSlice, 
    getCurrentGrid, 
    getExpanded, 
    getPostId, 
    useGetPostsByIdQuery } from "../../features/posts/getAllPostsSlice";
import { chooseUnedited, getNewImage } from "../../features/posts/newPostSlice";
import { store } from "../../app/store";
import { ImgContainer } from "../../components/artworks-components/img-component/img-container";
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

export function ArtworkGallery() {
    const [delay, setDelay] = useState(false); 
    const [postType, setPostType] = useState(null); // for use on  deciding what type of post to make (new post)
    const dispatch = useDispatch();
    const postRef = useRef(null); 
    const navigate = useNavigate();
    const currentGrid = useSelector(getCurrentGrid);
    const isExpanded = useSelector(getExpanded);
    const newImage = useSelector(getNewImage);
    const postId = useSelector(getPostId);
    const {
        data: post,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByIdQuery(postId);

  
    // manage whether or not the image is untouched while editing
    useEffect(() => {
        if (newImage) dispatch(chooseUnedited());
    }, [newImage, dispatch]);


    // useEffect to create a custom delay to differentiate between the mousedown event that shrinks the posts as it is pressed and the custom longpressevents 
    // without this expand functionality automatically closes upon opening
    useEffect(() => {
        let i = 1;
        if (isExpanded) {
            let interval = setTimeout(function() {
                if (i === 2) clearTimeout(interval)
                i++
                setDelay(true)
            }, 500)
        } else {
            i = 1;
            setDelay(false)
        }

        const handleHide = (e) => {
            if (postRef.current && !postRef.current.contains(e.target)) delay && contractImage();
        };
        document.addEventListener('click', handleHide, true);
        return () => {
            document.removeEventListener('click', handleHide, true);
        }
    }, [delay, isExpanded]);

    // shrink expanded image
    const contractImage = () => {
        dispatch(expandSinglePost(false));
        dispatch(changeCurrentGrid(currentGrid));
        setDelay(false);
    }

    // go to individual post by clicking on expanded image
    const goToPost = (id) => {
        dispatch(expandSinglePost(false));
        dispatch(editSinglePost(false));
        setDelay(false);
        return navigate(`/wizardgram/posts/${id}`)
    }

    return (
        <div>
            <SimpleBackground />
            <div id="instaGalleryContainer">
                <TopNavBar />
                <Outlet context={{postType, setPostType}} />
            </div>
            {isExpanded && 
            <div className="expandedPostContainer" 
            ref={postRef} 
            key={post.entities[postId].post[0].post_id} 
            onClick={() => {goToPost(post.entities[postId].post[0].post_id)}}>
                <div className="expandedHeader">
                    <div className="individualPostProfilePic"></div>
                    <h4 className="usernameHeader">Username</h4>
                </div>
                <div className="expandedPost">
                    <ImgContainer post={post.entities[postId].post[0]} imgClass={'expandPage'} render={(selected) => (
                        selected.vignette && (
                            <div className="vignette" style={{boxShadow: `inset 0px 0px ${selected.vignette_blur}px ${selected.vignette_spread}px rgba(0, 0, 0, 0.5)`}}></div>
                        ) 
                    )}/> 
                </div>
            </div>}
        </div>
    )
}
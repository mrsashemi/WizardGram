import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { SimpleBackground } from "../../components/backgrounds/background";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/artworkspage.css'
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentGrid, choosePostId, editSinglePost, expandSinglePost, extendedApiSlice, getAllPosts, getAllPostsStatus, getCurrentGrid, getExpanded, selectAllPosts } from "../../features/posts/getAllPostsSlice";
import { chooseUnedited, getNewImage } from "../../features/posts/newPostSlice";
import { store } from "../../app/store";
import { ImgContainer } from "../../components/artworks-components/img-component/img-container";

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

export function ArtworkGallery() {
    const { id } = useParams();
    const allPosts = useSelector(selectAllPosts);
    const currentGrid = useSelector(getCurrentGrid);
    const isExpanded = useSelector(getExpanded);
    const allPostsStatus = useSelector(getAllPostsStatus);
    const dispatch = useDispatch();

    const newImage = useSelector(getNewImage);

    const postRef = useRef(null); 
    const navigate = useNavigate();
    const [delay, setDelay] = useState(false); // for dom effects when clicking on post to expand
    const [multiples, setMultiples] = useState(null); // for use on deciding if multiples are being posted (new post)
    const [postType, setPostType] = useState(null); // for use on  deciding what type of post to make (new post)
    
    // fetch all posts from api
    useEffect(() => {
        if (allPostsStatus === 'idle') dispatch(getAllPosts(id));
    }, [allPostsStatus, dispatch, id])
    
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
            if (postRef.current && !postRef.current.contains(e.target)) {
                delay && contractImage();
            }
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
        dispatch(choosePostId(null));
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
                <Outlet context={{
                    newImage, 
                    multiples, setMultiples,
                    postType, setPostType}} />
            </div>
            {isExpanded && 
            <div className="expandedPostContainer" 
            ref={postRef} 
            key={allPosts[[...Object.keys(allPosts)]][0].post_id} 
            onClick={() => {goToPost(allPosts[[...Object.keys(allPosts)]][0].post_id)}}>
                <div className="expandedHeader">
                    <div className="individualPostProfilePic"></div>
                    <h4 className="usernameHeader">Username</h4>
                </div>
                <div className="expandedPost">
                    <ImgContainer post={allPosts[[...Object.keys(allPosts)]][0]} imgClass={'expandPage'} render={(selected) => (
                        selected.vignette && (
                            <div className="vignette" style={{boxShadow: `inset 0px 0px ${selected.vignette_blur}px ${selected.vignette_spread}px rgba(0, 0, 0, 0.5)`}}></div>
                        ) 
                    )}/> 
                </div>
            </div>}
        </div>
    )
}
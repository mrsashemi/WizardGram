const express = require('express');
const router = express.Router();
const {createPost, addImagesToPost, updatePost, deletePost, getPost, getAllFishstaPosts} = require("../controllers/postController");

router.post('/create-post', createPost);
router.post('/add-images-classes-to-post/', addImagesToPost)
router.get('/get-post/:id', getPost);
router.get('/get-all-fishstaposts', getAllFishstaPosts)
router.put('/update-post/:id', updatePost);
router.delete('/delete-post/:id', deletePost)


module.exports = router;
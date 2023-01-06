const express = require('express');
const router = express.Router();
const {createPost, updatePost, deletePost, getPost, getAllFishstaPosts} = require("../controllers/postController");

router.post('/create-post', createPost);
router.get('/get-post/:id', getPost);
router.get('/get-all-fishstaposts', getAllFishstaPosts)
router.put('/update-post', updatePost);
router.delete('/delete-post', deletePost)


module.exports = router;
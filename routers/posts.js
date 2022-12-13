const express = require('express');
const router = express.Router();
const {createPost, updatePost, deletePost, getPost} = require("../controllers/postController");

router.post('/create-post', createPost);
router.get('/get-post/:id', getPost)
router.put('/update-post', updatePost);
router.delete('/delete-post', deletePost)


module.exports = router;
const express = require('express');
const router = express.Router();
const {fishstaPost} = require("../controllers/fishstapost");

router.post('/fishstapost', fishstaPost);

module.exports = router;
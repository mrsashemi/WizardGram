const express = require('express');
const router = express.Router();
const {createClass} = require("../controllers/classController");

router.post('/create-class', createClass);


module.exports = router;
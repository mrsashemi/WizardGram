const express = require('express');
const router = express.Router();
const {register} = require("../controllers/register");
const {signin} = require("../controllers/signin");

router.post('/register', register);
router.post('/signin', signin);

module.exports = router;
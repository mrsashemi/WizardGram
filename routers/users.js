const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../controllers/usercontrols')
const {register} = require("../controllers/register");
const {signin} = require("../controllers/signin");
const verifyJWT = require('../middleware/verifyJWT');

router.post('/register', register);
router.post('/signin', signin);

app.use(verifyJWT);
router.get('/:id', userController.getUser);

module.exports = router;
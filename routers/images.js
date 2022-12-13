const multer = require('multer');
const express = require('express');
const router = express.Router();
const {saveImage, getOneImage, getAllImages, imageDelete} = require("../controllers/imageController");

// storage variable to upload file and provide destination folder
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

// below variable is defined to check the type of file which is uploaded
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/JPG' || file.mimetype === 'image/png' || file.mimetype === 'image/PNG') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// define the upload variable for the configuration of photo being uploaded
const upload = multer({storage: storage, fileFilter: filefilter});

router.post('/save-image', upload.single('image'), saveImage);
router.get('/get-single-image', getOneImage);
router.get('/get-all-images', getAllImages);
router.delete('/delete-image', imageDelete)

module.exports = router;
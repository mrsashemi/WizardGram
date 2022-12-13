const pool = require("../databases/db");
const { uploadFile, getFileStream, deleteFileFromS3 } = require('../databases/s3');
const jwt = require("jsonwebtoken");

// upload a photo to s3 and store in psql images table
exports.saveImage = async (req, res) => {
    const file = req.file;
    const result = await uploadFile(file);

    const cookies = req.cookies
    if (!cookies.jwt) return res.sendStatus(400);
    const refreshToken = cookies.jwt;

    try {
        const udata = await pool.query(`SELECT * FROM users WHERE refresh_token = $1;`, [refreshToken]);
        const user = udata.rows;

        if (user.length === 0) {
            res.status(401).json({
                error: "Unauthorized, please log back in"
            });
        } else {
            const img = {
                img_location: result.Location,
                img_key: result.Key
            }

            pool.query(`INSERT INTO images (img_location, img_key) VALUES ($1, $2) RETURNING img_id, img_location;`, 
            [img.img_location, img.img_key], (error, results) => {
                if (error) {
                    throw error
                }

                res.status(200).json({
                    message: "Image saved",
                    img_id: results.rows[0].img_id,
                    img_location: img.img_location,
                    img_key: img.img_key
                })
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error while creating post"
        })
    }
};

// get a single image from postgres 
exports.getOneImage = async (req, res) => {
    const img_id = parseInt(req.params.id);


    try {
        const data = await pool.query(`SELECT * FROM images WHERE img_id = $1;`, [img_id]);
        const images = data.rows;

        if (posts.length === 0) {
            res.status(404).json({
                error: "image not found"
            });
        } else {
            res.status(200).json({
                message: "Image found",
                img_id: images[0].img_id,
                image: images[0].img_location,
                key: images[0].img_key
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error while getting image"
        })
    }

};

// get all images from postgres
exports.getAllImages = async (req, res) => {
    try {
        const data = await pool.query(`SELECT * FROM images;`);
        const images = data.rows;

        if (images.length === 0) {
            res.status(404).json({
                error: "No images found"
            });
        } else {
            res.status(200).json({
                message: "Images found",
                imageList: images
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error while getting images"
        })
    }
}

// get images from s3
exports.getImg = async (req, res) => {
    const key = parseInt(req.params.key);
    const readStream = getFileStream(key);

    readStream.pipe(res);
}


// delete an image 
exports.imageDelete = async (req, res) => {
    const img_id = parseInt(req.params.id);

    try {
        const data = await pool.query(`SELECT * FROM images WHERE img_id = $1;`, [img_id]);
        const image = data.rows;
        
        if (image.length === 0) {
            res.status(404).json({
                error: "Image doesn't exist, either already deleted or never created"
            });
        } else {
            const result = await deleteFileFromS3(image[0].img_key);
            console.log(result);

            pool.query(`DELETE FROM images WHERE img_id = $1;`, [img_id], (error, results) => {
                if (error) {
                    throw error
                }

                res.status(200).json({
                    message: "Post deleted"
                })
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error while deleting post"
        })
    }
}
const pool = require("../databases/db");
const jwt = require("jsonwebtoken");

//upload a photo to s3 and store information in psql
exports.createClass = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const { 
        filter_class, 
        fit_class, 
        position_x, 
        position_y, 
        scale, 
        brightness, 
        contrast, 
        saturate, 
        grayscale, 
        sepia, 
        hue, 
        opacity, 
        blur, 
        rotate, 
        vignette, 
        vignette_class, 
        vignette_blur, 
        vignette_spread,
        unedited
    } = req.body;
    
    try {
        const udata = await pool.query(`SELECT * FROM users WHERE refresh_token = $1;`, [refreshToken]);
        const cdata = await pool.query(
            `SELECT * FROM image_classes 
            WHERE filter_class = $1 
            AND fit_class = $2 
            AND position_x = $3 
            AND position_y = $4 
            AND scale = $5 
            AND brightness = $6 
            AND contrast = $7 
            AND saturate = $8 
            AND grayscale = $9 
            AND sepia = $10 
            AND hue = $11 
            AND opacity = $12 
            AND blur = $13 
            AND rotate = $14
            AND vignette = $15
            AND vignette_class = $16
            AND vignette_blur = $17
            AND vignette_spread = $18
            AND unedited = $19;`, 
            [
                filter_class, 
                fit_class, 
                position_x, 
                position_y, 
                scale, 
                brightness, 
                contrast, 
                saturate, 
                grayscale, 
                sepia, 
                hue, 
                opacity, 
                blur, 
                rotate, 
                vignette, 
                vignette_class, 
                vignette_blur, 
                vignette_spread,
                unedited
            ]);
    
        const user = udata.rows;
        const classData = cdata.rows;

        if (user.length === 0) {
            res.status(401).json({
                error: "Unauthorized, please log back in"
            });
        } else if (classData.length >= 1) {
            res.status(303).json({
                message: "Class resource already exists in database",
                class_id: classData[0].class_id
            });
        } else {
            const classes = {
                filter_class, 
                fit_class, 
                position_x, 
                position_y, 
                scale, 
                brightness, 
                contrast, 
                saturate, 
                grayscale, 
                sepia, 
                hue, 
                opacity, 
                blur, 
                rotate, 
                vignette, 
                vignette_class, 
                vignette_blur, 
                vignette_spread 
            };

            pool.query(`INSERT INTO image_classes
                (filter_class, 
                fit_class, 
                position_x, 
                position_y, 
                scale, 
                brightness, 
                contrast, 
                saturate, 
                grayscale, 
                sepia, 
                hue, 
                opacity, 
                blur, 
                rotate, 
                vignette, 
                vignette_class, 
                vignette_blur, 
                vignette_spread)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING class_id;`,
                [
                    classes.filter_class, 
                    classes.fit_class, 
                    classes.position_x, 
                    classes.position_y, 
                    classes.scale, 
                    classes.brightness, 
                    classes.contrast, 
                    classes.saturate, 
                    classes.grayscale, 
                    classes.sepia, 
                    classes.hue, 
                    classes.opacity, 
                    classes.blur, 
                    classes.rotate, 
                    classes.vignette, 
                    classes.vignette_class, 
                    classes.vignette_blur, 
                    classes.vignette_spread 
                ], (error, results) => {
                    if (error) {
                        throw error
                    }
                    
                    res.status(200).json({
                        message: "Class Created",
                        class_id: results.rows[0].class_id,
                    })
                })
        };

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error while creating post"
        })
    }
}
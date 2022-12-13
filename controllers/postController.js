const Aws = require('aws-sdk');
const pool = require("../databases/db");
const jwt = require("jsonwebtoken");
const { uploadFile, getFileStream } = require('../databases/s3');





// upload a photo to s3 and store information in psql
exports.createPost = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const { post_type, title, body } = req.body;

    try {
        const udata = await pool.query(`SELECT * FROM users WHERE refresh_token = $1;`, [refreshToken]);
        const user = udata.rows;
        
        if (user.length === 0) {
            res.status(401).json({
                error: "Unauthorized, please log back in"
            });
        } else {
            const post = {
                post_type, 
                title,
                body,
                users_id: user[0].users_id,
            };

            pool.query(`INSERT INTO posts (post_type, title, body, users_id) VALUES ($1, $2, $3, $4) RETURNING post_id;`,
            [post.post_type, post.title, post.body, post.users_id], (error, results) => {
                if (error) {
                    throw error
                }

                res.status(200).json({
                    message: "Post Created",
                    post_id: results.rows[0].post_id,
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

//get post from postgres
exports.getPost = async (req, res) => {
    const post_id = parseInt(req.params.id);

    try {
        const data = await pool.query(`SELECT * FROM posts WHERE post_id = $1;`, [post_id]);
        const posts = data.rows;

        if (posts.length === 0) {
            res.status(404).json({
                error: "Post not found"
            });
        } else {
            const udata = await pool.query(`SELECT * FROM users WHERE users_id = $1;`, [posts[0].users_id]);
            const users = udata.rows;

            const idata = await pool.query(`SELECT * FROM images WHERE img_id = (SELECT img_id FROM posts_images WHERE post_id = $1);`, [post_id]);
            const postImages = idata.rows;

            res.status(200).json({
                message: "Image found",
                post_id: posts[0].post_id,
                theme_id: posts[0].theme_id,
                post_type: posts[0].post_type,
                title: posts[0].title,
                body: posts[0].body,
                date_created: posts[0].date_created,
                date_updated: posts[0].date_updated,
                user: users[0].username,
                images: postImages
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error while getting post"
        })
    }
}


//update a post to finalize
exports.updatePost = async (req, res) => {
    const post_id = parseInt(req.params.id);
    const cookies = req.cookies;
    if(!cookies.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const { body, theme_id, title, date_updated } = req.body;

    try {
        const udata = await pool.query(`SELECT * FROM users WHERE refresh_token = $1;`, [refreshToken]);
        const user = udata.rows;

        const data = await pool.query(`SELECT * FROM posts WHERE post_id = $1;`, [post_id]);
        const post = data.rows;

        if (user.length === 0) {
            res.status(401).json({
                error: "Unauthorized, please log back in"
            });
        } else if (post.length === 0) {
            res.status(404).json({
                error: "Post not found"
            });
        } else {
            const post = {
                body,
                theme_id,
                title,
                date_updated
            }

            pool.query(`UPDATE posts SET body = $1, theme_id = $2, title = $3, date_updated = $4 WHERE post_id = $5;`, 
            [post.body, post.theme_id, post.title, post.date_updated, post_id], (error, results) => {
                if (error) {
                    throw error
                }

                res.status(200).json({
                    message: "Post updated",
                    body: results.rows[0].body,
                    post_id: results.rows[0].id,
                    photo: results.rows[0].photos
                })
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error while updating post"
        })
    }
}


//delete a post
exports.deletePost = async (req, res) => {
    const post_id = parseInt(req.params.id);

    try {
        const data = await pool.query(`SELECT * FROM posts WHERE post_id = $1;`, [post_id]);
        const post = data.rows;

        if (post.length === 0) {
            res.status(404).json({
                error: "Post doesn't exist, either already deleted or never created"
            });
        } else {
            pool.query(`DELETE FROM posts WHERE post_id = $1;`, [post_id], (error, results) => {
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
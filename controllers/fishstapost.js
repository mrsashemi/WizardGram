const pool = require("../databases/db");
const jwt = require("jsonwebtoken");

exports.fishstaPost = async (req, res) => {
    const { post_type, title, body, photos, users_id } = req.body;

    
}
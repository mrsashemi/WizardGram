const bcrypt = require("bcrypt");
const pool = require("../databases/db");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
    const { email, hashed_password } = req.body;

    try {
        const data = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email])
        const user = data.rows;

        if (user.length === 0) {
            res.status(400).json({
                error: "Email is not registered!"
            });
        } else {
            bcrypt.compare(hashed_password, user[0].hashed_password, (err, result) => {
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) {
                    const token = jwt.sign(
                        {
                            email: email,
                        }, 
                        process.env.SECRET_KEY
                    );
                    res.status(200).json({
                        message: "User Signed In!",
                        token: token,
                    });
                } else {
                    if (result != true) {
                        res.status(400).json({
                            error: "Enter Correct Password!",
                        });
                    }
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!",
        });
    };
};
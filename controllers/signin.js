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
            bcrypt.compare(hashed_password, user[0].hashed_password, async (err, result) => {
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) {
                    const token = jwt.sign(
                        {
                            email: email,
                            username: user[0].username
                        }, 
                        process.env.SECRET_KEY,
                        { expiresIn: '30s' }
                    );

                    const refreshToken = jwt.sign(
                        {
                            email: email
                        },
                        process.env.REFRESH_SECRET_KEY,
                        { expiresIn: '1d' }
                    );

                    const refreshResult = await pool.query(`UPDATE users SET refresh_token = $1 WHERE users_id = $2;`, [refreshToken, user[0].users_id]);
                    console.log(refreshResult);

                    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24*60*60*1000 })
                    

                    res.status(200).json({
                        message: "User Signed In!",
                        token: token,
                        admin: user[0].administrator,
                        verified: user[0].verified,
                        username: user[0].username,
                        fname: user[0].first_name,
                        lname: user[0].last_name,
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
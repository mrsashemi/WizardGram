const pool = require("../databases/db");
const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const data = await pool.query(`SELECT * FROM users WHERE refresh_token = $1;`, [refreshToken]);
    const user = data.rows;
    if (user.length === 0) {
        return res.sendStatus(403);
    } else {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY,
            (err, decoded) => {
                if (err || user[0].email !== decoded.email) return res.sendStatus(403);
                const token = jwt.sign(
                    {
                        email: decoded.email,
                        username: user[0].username
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: '30s' }
                );
                res.status(200).json({
                    token: token,
                    admin: user[0].administrator,
                    verified: user[0].verified,
                    username: user[0].username,
                    fname: user[0].first_name,
                    lname: user[0].last_name,
                });
            }
        )
    }

}
const bcrypt = require("bcrypt");
const pool = require("../databases/db");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { first_name, last_name, hashed_password, email, username } = req.body;
    try {
        const edata = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        const udata = await pool.query(`SELECT * FROM users WHERE username = $1;`, [username]);
        const e_arr = edata.rows;
        const u_arr = udata.rows;
        if (e_arr.length != 0) {
            return res.status(400).json({
                error: "Email already exists!"
            });
        } else if (u_arr.length != 0) {
            return res.status(400).json({
                error: "Username already exists!"
            });
        } else {
            bcrypt.hash(hashed_password, 10, (err, hash) => {
                if (err) {
                    res.status(err).json({
                        error: "Server error",
                    });
                }

                const user = {
                    first_name,
                    last_name,
                    hashed_password: hash,
                    email,
                    username,
                };
                let flag = 1;

                pool.query(`INSERT INTO users (first_name, last_name, hashed_password, email, username) VALUES ($1, $2, $3, $4, $5);`, 
                [user.first_name, user.last_name, user.hashed_password, user.email, user.username], (err) => {
                    if (err) {
                        flag =  0; //if user isn't inserted, assign flag as 0/false
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
                        })
                    } else {
                        flag = 1;
                        res.status(200).send({
                            message: 'User added to database, not verified yet'
                        });
                    }
                })

                if (flag) {
                    const token = jwt.sign(
                        {
                            email: user.email
                        },
                        process.env.SECRET_KEY
                    );
                };
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!"
        });
    };
}
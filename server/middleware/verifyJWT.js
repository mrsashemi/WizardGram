const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.username = decoded.username;
            req.email = decoded.email;
            next();
        }
    );
}

module.exports = verifyJWT;
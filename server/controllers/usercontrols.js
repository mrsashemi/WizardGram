const pool = require("../databases/db");

const getAllUsers = async (req, res) => {
    const data = await pool.query(`SELECT * FROM users;`);
    const users = data.rows;

    if (users.length === 0) return res.status(204).json({'message': 'No Users Found'});
    res.json(users);
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await pool.query(`SELECT * FROM users WHERE users_id = $1;`, [id]);
    const user = data.rows;

    if (user.length === 0) return res.status(204).json({'message': `User ID ${req.params.id} not found`});
    const result = await pool.query(`DELETE FROM users WHERE users_id = $1`, [id]);
    res.json(result);
}

const getUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await pool.query(`SELECT * FROM users WHERE users_id = $1;`, [id]);
    const user = data.rows;
    
    if (user.length === 0) return res.status(204).json({'message': 'User not found'});
    res.json(user[0]);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}
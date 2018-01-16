module.exports = {
    getUsers: "SELECT * FROM users ORDER BY id DESC",
    findByUsername: (username) => `SELECT * FROM users WHERE username = '${username}'`
}
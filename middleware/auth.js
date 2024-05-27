const jwt = require('jsonwebtoken');
require('dotenv').config()
const SALT = process.env.SALT

module.exports = {
    generateToken: (id, role) => {
        const token = jwt.sign({ id, role }, SALT)
        return token
    },

    verifyUserToken: async (req, res, next) => {
        try {
            let token = req.headers.authorization
            if (!token) {
                return res.status(403).json({ errmsg: 'Access denied' })
            }

            if (token.startsWith('Bearer')) {
                token = token.slice(7, token.length).trimLeft()
            }
            const verified = jwt.verify(token, SALT)
            if (verified.role === 'user') {
                req.payload = verified
                next()

            } else {
                req.status(403).json({ errmsg: 'Access denied' })
            }
        } catch (error) {
            res.status(500).json({ errmsg: 'server error' })
        }
    }
}

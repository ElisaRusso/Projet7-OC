const jwt = require('jsonwebtoken');
const User = require('../models/user')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        User.findOne({
            where: {
                id: userId
            }
        })
            .then(user => {
                if (user.isAdmin == true) {
                    console.log(user.isAdmin)
                    next()
                }
                else {
                    throw 'Not Admin';
                }

            })
            .catch(error => res.status(400).json({ error }));

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }

};
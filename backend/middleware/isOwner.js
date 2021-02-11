const jwt = require('jsonwebtoken');
const Article = require('../models/article');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        Article.findAll({
            where: {
                id: req.params.id
            }
        })
            .then(article => {
                if (article[0].userId == userId) {
                    next()
                } else {
                    throw 'Invalid user ID';

                }
            })
            .catch(error => res.status(400).json({ error }));

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

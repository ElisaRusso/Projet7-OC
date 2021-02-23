const { compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const Article = require('../models/article');
const User = require('../models/user')



module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        console.log(req.body)
        Article.findAll({
            where: {
                id: req.params.id
            }
        })
            .then(article => {
                if (article[0].userId == userId) {
                    next();
                    console.log(req.body)

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

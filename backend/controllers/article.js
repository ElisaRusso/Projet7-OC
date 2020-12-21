const Article = require('../models/article');
const sequelize = require('../db.config');


exports.createArticle = (req, res, next) => {

    const article = new Article({
        text: req.body.text
    });
    article.save()
        .then(() => res.status(201).json({ message: 'Article créé !' }))
        .catch(error => res.status(400).json({ error }));

}


exports.GetAllArticles = (req, res, next) => {
    Article.findAll()
        .then(articles => res.status(201).json(articles))
        .catch(error => res.status(400).json({ error }));
}
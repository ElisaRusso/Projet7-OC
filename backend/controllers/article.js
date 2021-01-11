const Article = require('../models/article');
const sequelize = require('../db.config');
const User = require('../models/user');



exports.createArticle = (req, res, next) => {
    const articleObject = { ...req.body };
    const article = new Article({
        ...articleObject,
    });
    article.save()
        .then(() => res.status(201).json({ message: 'Article créé !' }))
        .catch(error => res.status(400).json({ error }));

}

exports.deleteArticle = (req, res, next) => {
    Article.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(article => {
            Article.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.modifyArticle = (req, res, next) => {
    const articleObject = { ...req.body };
    Article.update(
        { ...articleObject, id: req.params.id },
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));

}

exports.getOneArticle = (req, res, next) => {
    Article.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(article => res.status(200).json(article))
        .catch(error => res.status(404).json({ error }));

}

exports.getAllArticles = (req, res, next) => {
    Article.findAll()
        .then(articles => res.status(201).json(articles))
        .catch(error => res.status(400).json({ error }));
}
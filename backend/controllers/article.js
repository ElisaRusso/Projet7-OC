const Article = require('../models/article');
const sequelize = require('../db.config');
const User = require('../models/user');
const Comment = require('../models/comment')
const fs = require('fs');



exports.createArticle = (req, res, next) => {
    const articleObject = { ...req.body };
    if (req.file) {
        const article = new Article({
            ...articleObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        saveArticle(article);
    }
    else {
        const article = new Article({
            ...articleObject,
        });
        saveArticle(article);
    }
    function saveArticle(article) {
        article.save()
            .then(() => res.status(201).json({ message: 'Article créé !' }))
            .catch(error => res.status(400).json({ error }))
    }


}

exports.deleteArticle = (req, res, next) => {
    Article.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(article => {
            if (article.imageUrl != '' || article.imageUrl != null) {
                const filename = article.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    destroyArticle(article)
                });
            }
            else {
                destroyArticle();
            }
        })
        .catch(error => res.status(500).json({ error }));

    function destroyArticle() {
        Comment.destroy({
            where: {
                articleId: req.params.id
            }
        })
        Article.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ error }));
    }
};

// exports.modifyArticle = (req, res, next) => {
//     const articleObject = { ...req.body };
//     Article.update(
//         { ...articleObject, id: req.params.id },
//         {
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(() => res.status(200).json({ message: 'Objet modifié !' }))
//         .catch(error => res.status(400).json({ error }));

// }
exports.modifyArticle = (req, res, next) => {
    if (req.file) {
        Article.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(article => {
                const filename = article.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) throw err;
                })
            })
            .catch(error => res.status(400).json({ error }));
    }


    const articleObject = req.file ?
        {
            ...JSON.parse(req.body),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };


    Article.update({ ...articleObject, id: req.params.id },
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneArticle = (req, res, next) => {
    Article.findOne({
        where: { id: req.params.id },
        include: [{ model: User, as: 'user' }],
    })
        .then(article => res.status(200).json(article))
        .catch(error => res.status(404).json({ error }));

}

exports.getAllArticles = (req, res, next) => {
    Article.findAll(
        { include: [{ model: User, as: 'user' }] })
        .then(articles => res.status(201).json(articles))
        .catch(error => res.status(400).json({ error }));
}
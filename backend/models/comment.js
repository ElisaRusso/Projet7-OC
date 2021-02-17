const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('groupomania_base', 'student', 'U5d)+Br63', {
    host: 'localhost',
    dialect: 'mysql'
});
const User = require('../models/user');
const Article = require('./article');

const Comment = sequelize.define('Comment', {
    // Model attributes are defined here
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    articleId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    }
}
);
User.hasMany(Comment, {
    foreignKey: 'userId',
});
Article.hasMany(Comment, {
    foreignKey: 'articleId',
});

Comment.belongsTo(User, { as: 'user' });
Comment.belongsTo(Article, { as: 'article' });

module.exports = Comment;
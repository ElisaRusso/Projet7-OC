const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('groupomania_base', 'student', 'U5d)+Br63', {
    host: 'localhost',
    dialect: 'mysql'
});
const User = require('../models/user');

const Article = sequelize.define('Article', {
    // Model attributes are defined here
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
);
User.hasMany(Article, {
    foreignKey: 'userId'
});
Article.belongsTo(User, { as: 'user' });

module.exports = Article;




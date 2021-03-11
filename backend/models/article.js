const User = require('../models/user');
const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../db.config')

const Article = sequelize.define('Article', {
    // Model attributes are defined here
    userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}
);


User.hasMany(Article, {
    foreignKey: 'userId',
});


Article.belongsTo(User, { as: 'user' });


module.exports = Article;




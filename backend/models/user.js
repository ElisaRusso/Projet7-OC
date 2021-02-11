const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('groupomania_base', 'student', 'U5d)+Br63', {
    host: 'localhost',
    dialect: 'mysql'
});
const Article = require('../models/article');

const User = sequelize.define('User', {
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}
);

module.exports = User;

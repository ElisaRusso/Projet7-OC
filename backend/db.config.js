const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('groupomania_base', 'student', 'U5d)+Br63', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
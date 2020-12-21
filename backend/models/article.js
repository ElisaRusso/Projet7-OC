const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('groupomania_base', 'student', 'U5d)+Br63', {
    host: 'localhost',
    dialect: 'mysql'
});


const Article = sequelize.define('Article', {
    // Model attributes are defined here
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
}
);

module.exports = Article;
// (async () => {
    // await sequelize.sync({ alter: true });
    // const test = await User.create({ firstName: "testName", lastName: 'testLastName' });
    // const test2 = await User.create({ firstName: 'Name2', lastName: 'lastName2' });
    // const users = await User.findAll({
    //     where: {
    //         firstName: 'Name2'
    //     }
    // });
    // console.log("Users firstName: Name2", JSON.stringify(users, null, 2));
    // console.log(users.every(user => user instanceof User));



    // User.destroy({
    //     where: {
    //         id: {
    //             [Op.gt]: 5
    //         }
    //     }
    // })
    // const users = await User.findAll()
    // console.log("Users", JSON.stringify(users, null, 2));
// }
// )();



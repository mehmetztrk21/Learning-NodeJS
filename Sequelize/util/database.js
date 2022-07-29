const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodeCourse', 'root', '123', {  //db adı, username, pass
  dialect: 'mysql',  //db türü
  host: 'localhost'  //host
});

module.exports = sequelize;


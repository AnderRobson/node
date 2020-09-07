const Sequelize = require('sequelize');

const database = {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
};

const sequelize = new Sequelize(
    database.database,
    database.user,
    database.password,
    {
        host: database.host,
        port: database.port,
        dialect: 'mysql'
    }
);

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
};
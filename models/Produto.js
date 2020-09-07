const mysql = require('../configs/mysql');

const Produto = mysql.sequelize.define('products', {
    title: {
        type: mysql.Sequelize.STRING
    },
    slug: {
        type: mysql.Sequelize.STRING
    },
    code: {
        type: mysql.Sequelize.INTEGER
    },
    description: {
        type: mysql.Sequelize.TEXT
    },
    status: {
        type: mysql.Sequelize.BOOLEAN
    }
});

module.exports = Produto;
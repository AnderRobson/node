const mysql = require('../configs/mysql');

const Produto = mysql.sequelize.define('produtos', {
    nome: {
        type: mysql.Sequelize.STRING
    },
    preco: {
        type: mysql.Sequelize.FLOAT
    }
});

module.exports = Produto;
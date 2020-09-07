const mysql = require('../configs/mysql');

const Pedido = mysql.sequelize.define('pedidos', {
    id_produto: {
        type: mysql.Sequelize.INTEGER,
    },
    quantidade: {
        type: mysql.Sequelize.INTEGER
    }
});

module.exports = Pedido;
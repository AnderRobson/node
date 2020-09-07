const express = require('express');
const router = express.Router();
const Produto = require('../../models/Produto');
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Dentro do admin'
    });
    // Produto.findAll().then(resultado => {
    //     res.render('admin/product/index', {
    //         produtos: resultado.map(produto => {
    //             return {
    //                 id: produto.id,
    //                 nome: produto.nome,
    //                 preco: produto.preco
    //             }
    //         })
    //     });
    // }).catch(error => {
    //
    // });
});

module.exports = router;
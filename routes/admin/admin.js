const express = require('express');
const router = express.Router();
const Produto = require('../../models/Produto');

router.get('/', (req, res, next) => {
   res.render('admin/index');
});

router.get('/produtos', (req, res, next) => {
    Produto.findAll().then(resultado => {
        res.render('admin/product/index', {
            produtos: resultado.map(produto => {
                return {
                    id: produto.id,
                    code: produto.code,
                    title: produto.title,
                    description: produto.description.substring(0, 80),
                    status: produto.status
                }
            })
        });
    }).catch(error => {
        return res.status(500).send({
            error: error
        });
    });
});

router.get('/produtos/edit/:id_produto', (req, res, next) => {
    const id_produto = req.params.id_produto;
    Produto.findByPk(id_produto).then(resultado => {
        res.render('admin/product/edit', {
            produto: {
                id: resultado.id,
                code: resultado.code,
                title: resultado.title,
                description: resultado.description,
                status: resultado.status
            }
        })
    }).catch(error => {
        res.status(500).send({
            mensagem: 'Erro ao acessar a página de editar produto'
        })
    })
});

module.exports = router;
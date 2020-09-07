const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

router.get('/cad', (req, res, next) => {
    res.render('formulario');
});

router.get('/list', (req, res, next) => {
    Produto.findAll().then(resultado => {
        res.render('home', {
            produtos: resultado.map(produto => {
                return {
                    id: produto.id,
                    status : produto.status,
                    title : produto.title,
                    description: produto.description,
                    code: produto.code
                }
            })
        });
    }).catch(error => {

    });


});

/**
 * Retorna todos os Produtos
 */
router.get('/', (req, res, next) => {
    Produto.findAll().then(resultado => {
        return res.status(200).send({
           quantidade: resultado.length,
           produtos: resultado.map(produto => {
               return {
                   id: produto.id,
                   status : produto.status,
                   title : produto.title,
                   description: produto.description,
                   code: produto.code
               }
           })
        });
    }).catch(error => {
        return res.status(500).send({
            error: error
        });
    });
});

/**
 * Insere um Produto
 */
router.post('/', (req, res, next) => {
    let produto = {
        id: null,
        status : req.body.status,
        title : req.body.title,
        description: req.body.description,
        code: req.body.code
    };

    Produto.create({
        status : produto.status,
        title : produto.title,
        description: produto.description,
        code: produto.code
    }).then(resultado => {
        return res.status(201).send({
            mensagem: 'Produto cadastrado com sucesso',
            produto: {
                id: resultado.id,
                status : resultado.status,
                title : resultado.title,
                description: resultado.description,
                code: resultado.code,
                request: {
                    tipo: 'POST',
                    descricao: 'Cadastrando Produto',
                    url: 'http://localhost:9090/produtos/' + resultado.id
                }
            }
        });
    }).catch(error => {
        return res.status(500).send({
            error: error
        });
    });
});

/**
 * Altera um Produto
 */
router.patch('/:id_produto', (req, res, next) => {
    let produto = {
        id_produto: req.params.id_produto,
        status : req.body.status,
        title : req.body.title,
        description: req.body.description,
        code: req.body.code
    }
    let update = {};

    if (produto.status) {
        update.status = produto.status;
    }

    if (produto.title) {
        update.preco = produto.title;
    }

    if (produto.description) {
        update.description = produto.description;
    }

    if (produto.code) {
        update.code = produto.code;
    }

    Produto.update(update, {
        where: {
            id: produto.id_produto
        }
    }).then(response => {
        let communication = {
            code: 202,
            message: 'Produto alterado com sucesso'
        }
        if (! response[0]) {
            communication.code = 500;
            communication.message = 'Erro ao alterar o produto'
        }

        res.status(communication.code).send({
            mensagem: communication.message
        });
    }).catch(error => {
        return res.status(500).send({
            error: error
        });
    });
});

/**
 * Deleta um Produto
 */
router.delete('/:id_produto', (req, res, next) => {
    const id_produto = req.params.id_produto;

    Produto.destroy({
        where: {
            id: id_produto
        }
    }).then(response => {
        let communication = {
            code: 202,
            message: 'Produto deletado com sucesso'
        }
        if (! response) {
            communication.code = 500;
            communication.message = 'Erro ao deletado o produto'
        }

        res.status(communication.code).send({
            mensagem: communication.message
        });
    }).catch(error => {
        res.status(500).send({
            mensagem: 'Erro ao excluir produto'
        });
    });
});

/**
 * Retorna os dados de um Produto
 */
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;

    if (! parseInt(id)) {
        res.status(401).send({
            menagem: "O id do Produto precisar ser um número"
        });
    }

    Produto.findByPk(id).then(resultado => {
        let produto = {};
        if (resultado !== null) {
            produto = {
                id: resultado.id,
                status : resultado.status,
                title : resultado.title,
                description: resultado.description,
                code: resultado.code,
            }
        }

        return  res.status(200).send({
            produto: produto
        });
    }).catch(error => {
        return res.status(500).send({
            error: error
        });
    });
});

module.exports = router;
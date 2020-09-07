const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

/**
 * Retorna todos os Pedidos
 */
router.get('/', (req, res, next) => {
    Pedido.findAll().then(resultado => {
        return res.status(200).send({
            quantidade: resultado.length,
            pedidos: resultado.map(pedido => {
                return {
                    id: pedido.id,
                    id_produto: pedido.id_produto,
                    quantidade: pedido.quantidade
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
 * Insere um Pedido
 */
router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    };

    Pedido.create({
        id_produto: pedido.id_produto,
        quantidade: pedido.quantidade
    }).then(resultado => {
        return res.status(201).send({
            mensagem: "Pedido cadastrado com sucesso",
            pedido: {
                id: resultado.id,
                id_produto: resultado.id_produto,
                quantidade: resultado.quantidade,
                request: {
                    tipo: 'POST',
                    descricao: 'Cadastrando Pedido',
                    url: 'http://localhost:9090/pedidos/' + resultado.id
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
 * Alterar um Pedido
 */
router.patch('/:id_pedido', (req, res, next) => {
    let pedido = {
        id_pedido: req.params.id_pedido,
        id_produto : req.body.id_produto,
        quantidade: req.body.quantidade
    }
    let update = {};

    if (pedido.id_produto) {
        update.id_produto = pedido.id_produto;
    }

    if (pedido.quantidade) {
        update.quantidade = pedido.quantidade;
    }

    Pedido.update(update, {
        where: {
            id: pedido.id_pedido
        }
    }).then(response => {
        let communication = {
            code: 202,
            message: 'Pedido alterado com sucesso'
        }
        if (! response[0]) {
            communication.code = 500;
            communication.message = 'Erro ao alterar o pedido'
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
 *  Excluir um pedido
 */
router.delete('/:id_pedido', (req, res, next) => {
    const id_pedido = req.params.id_pedido;

    Pedido.destroy({
        where: {
            id: id_pedido
        }
    }).then(response => {
        let communication = {
            code: 202,
            message: 'Pedido deletado com sucesso'
        }
        if (! response) {
            communication.code = 500;
            communication.message = 'Erro ao deletado o pedido '
        }

        res.status(communication.code).send({
            mensagem: communication.message
        });
    }).catch(error => {
        res.status(500).send({
            mensagem: 'Erro ao excluir pedido'
        });
    });
});

/**
 * Retorna os dados de um Pedido
 */
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;

    if (! parseInt(id)) {
        res.status(401).send({
            mensagem: 'O id do Pedido precisa ser um número'
        });
    }

    Pedido.findByPk(id).then(resultado => {
        let pedido = {};
        if (resultado !== null) {
            pedido = {
                id: resultado.id,
                id_produto: resultado.id_produto,
                quantidade: resultado.quantidade
            }
        }

        return res.status(200).send({
            pedido: pedido
        });
    }).catch(error => {
        return res.status(500).send({
            error: error
        });
    });
});

module.exports = router;
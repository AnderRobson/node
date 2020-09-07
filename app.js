const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const express = require('express');
const app = express();
const rotaAdmin = require('./routes/admin/admin');
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//Ajustando cors
app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Origin',
        '*'
    );
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );

        return res.status(200).send({});
    }

    next();
});

app.use('/admin', rotaAdmin);
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

app.use('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: 'OK, Deu certo'
    });
});

/**
 * Quando não encontra a rota
 */
app.use((req, res, next) => {
    const erro = new Error('Não encontrado !');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);

    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;
const express = require('express');
// banco de dados mongodb
const mongoose = require('mongoose');
const cors = require('cors');
// importando rotas
const routes = require('./routes');

// criando o servidor
const server = express();

// conexão com o banco de dados
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-r58uk.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// utilizando cors para permitir que a aplicação seja acessada de qualquer endereço
server.use(cors());
// para o servidor entender o formato json
server.use(express.json());

server.use(routes);


// subindo o servidor
server.listen(3333);
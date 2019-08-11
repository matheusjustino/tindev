const express = require('express');
// banco de dados mongodb
const mongoose = require('mongoose');
const cors = require('cors');
// importando rotas
const routes = require('./routes');

// criando o servidor
const app = express();
const server = require('http').Server(app);
// fazendo o servidor receber requisições http e websocket
const io = require('socket.io')(server);
// armazenando id e socket do usuário
const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
  
    connectedUsers[user] = socket.id;
  });
  

// conexão com o banco de dados
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-r58uk.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});


app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
  
    return next();
  });

// utilizando cors para permitir que a aplicação seja acessada de qualquer endereço
app.use(cors());
// para o servidor entender o formato json
app.use(express.json());

app.use(routes);


// subindo o servidor
server.listen(3333);
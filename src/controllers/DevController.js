const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        // listagem de usuários que o user logado ainda não deu like ou dislike
        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } }, // usuários que não tenham id igual ao id de user logado
                { _id: { $nin: loggedDev.likes } }, // descartando todos os usuários em que já deu like
                { _id: { $nin: loggedDev.dislikes } } // descartando todos os usuários em que já deu dislike
            ]
        });

        return res.json(users);
    },

    async store(req, res) {
        // pegando o username da requisição para buscar os dados na api do github
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });
        /* caso o usuário que está sendo criado já exista, então ele será retornado impedindo a repetição de usuários. */
        if (userExists) {
            return res.json(userExists);
        }

        // fazendo a requisição na api
        const response = await axios.get(`https://api.github.com/users/${username}`);
        // pegando apenas os dados necessários do response para salvar no banco de dados
        const { name, bio, avatar_url: avatar } = response.data;
        // criando um Dev para salvar no banco de dados
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        return res.json(dev);
    }
};
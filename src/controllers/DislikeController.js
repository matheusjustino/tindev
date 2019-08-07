const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        // obtendo id do usuário que está recebendo o dislike
        const { devId } = req.params;
        // obtendo o id do usuário que está logado e dando o dislike
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user); // instância do dev logado
        const targetDev = await Dev.findById(devId); // instância do dev que está recebendo o dislike
        
        // verificando se o dev alvo existe
        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }



        // salvando no array de dislikes
        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};
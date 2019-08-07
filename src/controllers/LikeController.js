const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        // obtendo id do usuário que está recebendo o like
        const { devId } = req.params;
        // obtendo o id do usuário que está logado e dando o like
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user); // instância do dev logado
        const targetDev = await Dev.findById(devId); // instância do dev que está recebendo o like
        
        // verificando se o dev alvo existe
        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        // verificando se o alvo já deu like no usuário logado, assim avisando se deu match
        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('deu match');
        }

        // salvando no array de likes
        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};
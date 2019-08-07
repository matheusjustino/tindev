const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{ // vetor para salvar todos os desenvolvedores em que você deu like
        type: Schema.Types.ObjectId,
        ref: 'Dev', // referenciando qual é o Schema utilizada
    }],
    dislikes: [{ // vetor para salvar todos os desenvolvedores em que você deu like
        type: Schema.Types.ObjectId,
        ref: 'Dev', // referenciando qual é o Schema utilizada
    }],
}, {
    timestamps: true, /* createdAt, updatedAt. Pra criar e salvar automaticamente a data de criação de um registro e a última alteração feita em um registro. */
});

module.exports = model('Dev', DevSchema);
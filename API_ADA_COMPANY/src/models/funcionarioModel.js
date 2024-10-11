const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chatBotSchema = new Schema({
    id_chatbot: {
        type: Number,
        required: true
    },
    texto_chat: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    }
});

let funcionarioSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    nomeFuncionario: {
        type: String,
        required: true,
        max: 100
    },
    cep: {
        type: String,
        required: true
    },
    logradouro: {
        type: String,
        required: true
    },
    complemento: {
        type: String
    },
    bairro: {
        type: String,
        required: true
    },
    localidade: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    ddd: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    idUsuario: {
        type: Number,
        required: true // Associado ao modelo de Usuario para autenticação
    },
    chatBot: [chatBotSchema]
});

module.exports = mongoose.model('Funcionario', funcionarioSchema);

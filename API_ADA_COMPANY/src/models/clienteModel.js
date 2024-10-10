const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    _id: { type: Number, required: true }, // O ID será um número conforme o exemplo
    nomeCliente: { type: String, required: true, max: 100 },
    telefone: { type: String, required: true },
    endereco: { type: String, required: true },
    localizacao: {
        type: {
            type: String, // Tipo de localização (Point)
            enum: ['Point'], // Só aceita 'Point'
            required: true
        },
        coordinates: {
            type: [Number], // Array de números [longitude, latitude]
            required: true
        }
    },
    cnpj: { type: String, required: true },
    cep: { type: String, required: true },
    logradouro: { type: String, required: true },
    complemento: { type: String },
    bairro: { type: String, required: true },
    localidade: { type: String, required: true },
    uf: { type: String, required: true },
    estado: { type: String, required: true },
    ddd: { type: String, required: true },
    usuario: {
        email: { type: String, required: true },
        senha: { type: String, required: true },
        tipoUsuario: { type: String, required: true },
        telefone: { type: String, required: true },
        nomeCompleto: { type: String, required: true }
    }
});

// Exportar o modelo
module.exports = mongoose.model('Cliente', clienteSchema);

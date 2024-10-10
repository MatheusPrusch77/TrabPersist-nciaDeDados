const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let servicoSchema = new Schema({
    _id: {
        type: Number, 
        required: true
    },
    nome: {
        type: String, 
        required: true, 
        max: 100
    },
    valor: {
        type: Number, 
        required: true
    },
    tipoServico: {
        type: String, 
        required: true,
        enum: ['Venda', 'Serviço']  // Exemplo de enum para restringir os tipos de serviço
    }
});

module.exports = mongoose.model('Servico', servicoSchema);

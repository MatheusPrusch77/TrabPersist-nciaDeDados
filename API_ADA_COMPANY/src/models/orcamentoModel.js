const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orcamentoSchema = new Schema({
    clienteId: {
        type: Number,
        ref: 'Cliente',
        required: true
    },
    validadeOrcamento: {
        type: Date,
        required: true
    },
    dataCriacao: {
        type: Date,
        required: true
    },
    valorTotal: {
        type: Number,
        required: true
    },
    tipoServico: {
        type: [String], // Alterado para array de strings
        required: true
    },
    statusOrcamento: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    emailVendedor: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Orcamento', orcamentoSchema);

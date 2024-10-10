var Orcamento = require('../models/orcamentoModel');

// Método para listar todos os orçamentos
exports.getOrcamento = async function (req, res) {
    try {
        const result = await Orcamento.find().populate('clienteId'); // Popula o campo clienteId com dados relacionados
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Método para criar um orçamento
exports.create = function (req, res) {
    let orcamento = new Orcamento({
        clienteId: req.body.clienteId,
        validadeOrcamento: req.body.validadeOrcamento,
        dataCriacao: req.body.dataCriacao,
        valorTotal: req.body.valorTotal,
        tipoServico: req.body.tipoServico, // Espera um array de serviços
        statusOrcamento: req.body.statusOrcamento,
        descricao: req.body.descricao,
        emailVendedor: req.body.emailVendedor
    });

    orcamento.save()
        .then(() => {
            res.status(201).send(orcamento.toJSON());
        })
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar orçamento.` });
        });
};

// Método para atualizar um orçamento (atualização parcial)
exports.updateOrcamento = async function (req, res) {
    try {
        const { id } = req.params;

        // Apenas os campos presentes no body serão atualizados
        const updateData = {};
        if (req.body.clienteId) updateData.clienteId = req.body.clienteId;
        if (req.body.validadeOrcamento) updateData.validadeOrcamento = req.body.validadeOrcamento;
        if (req.body.dataCriacao) updateData.dataCriacao = req.body.dataCriacao;
        if (req.body.valorTotal) updateData.valorTotal = req.body.valorTotal;
        if (req.body.tipoServico) updateData.tipoServico = req.body.tipoServico;
        if (req.body.statusOrcamento) updateData.statusOrcamento = req.body.statusOrcamento;
        if (req.body.descricao) updateData.descricao = req.body.descricao;
        if (req.body.emailVendedor) updateData.emailVendedor = req.body.emailVendedor;

        const updatedOrcamento = await Orcamento.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedOrcamento) {
            return res.status(404).send({ message: 'Orçamento não encontrado.' });
        }

        return res.status(200).json(updatedOrcamento);
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao atualizar o orçamento.` });
    }
};

// Método para deletar um orçamento
exports.deleteOrcamento = async function (req, res) {
    try {
        const { id } = req.params;

        const deletedOrcamento = await Orcamento.findByIdAndDelete(id);

        if (!deletedOrcamento) {
            return res.status(404).send({ message: 'Orçamento não encontrado.' });
        }

        return res.status(200).send({ message: 'Orçamento deletado com sucesso.' });
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao deletar o orçamento.` });
    }
};

// Método para obter detalhes de um orçamento pelo ID
exports.details = async function (req, res) {
    try {
        const result = await Orcamento.findById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

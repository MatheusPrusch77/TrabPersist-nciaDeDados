var Funcionario = require('../models/funcionarioModel');

// Método para listar todos os funcionários
exports.getFuncionarios = async function (req, res) {
    try {
        const result = await Funcionario.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Método para criar um funcionário
exports.createFuncionario = function (req, res) {
    let funcionario = new Funcionario({
        _id: req.body._id,
        nomeFuncionario: req.body.nomeFuncionario,
        cep: req.body.cep,
        logradouro: req.body.logradouro,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        localidade: req.body.localidade,
        uf: req.body.uf,
        estado: req.body.estado,
        ddd: req.body.ddd,
        cargo: req.body.cargo,
        idUsuario: req.body.idUsuario,
        chatBot: req.body.chatBot
    });

    funcionario.save()
        .then(() => {
            res.status(201).send(funcionario.toJSON());
        })
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - Falha ao cadastrar funcionário.` });
        });
};

// Método para atualizar um funcionário
exports.updateFuncionario = async function (req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedFuncionario = await Funcionario.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedFuncionario) {
            return res.status(404).send({ message: 'Funcionário não encontrado.' });
        }

        return res.status(200).json(updatedFuncionario);
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao atualizar o funcionário.` });
    }
};

// Método para deletar um funcionário
exports.deleteFuncionario = async function (req, res) {
    try {
        const { id } = req.params;

        const deletedFuncionario = await Funcionario.findByIdAndDelete(id);

        if (!deletedFuncionario) {
            return res.status(404).send({ message: 'Funcionário não encontrado.' });
        }

        return res.status(200).send({ message: 'Funcionário deletado com sucesso.' });
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao deletar o funcionário.` });
    }
};

// Método para obter detalhes de um funcionário pelo ID
exports.getFuncionarioById = async function (req, res) {
    try {
        const result = await Funcionario.findById(req.params.id);
        if (!result) {
            return res.status(404).send({ message: 'Funcionário não encontrado.' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

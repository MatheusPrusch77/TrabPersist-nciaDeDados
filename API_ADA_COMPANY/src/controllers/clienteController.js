const Cliente = require('../models/clienteModel');

exports.getClientes = async function (req, res) {
    try {
        const result = await Cliente.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = async function (req, res) {
    try {
        let cliente = new Cliente({
            nomeCliente: req.body.nomeCliente,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            localizacao: {
                type: 'Point',
                coordinates: req.body.localizacao.coordinates
            },
            cnpj: req.body.cnpj,
            cep: req.body.cep,
            logradouro: req.body.logradouro,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            localidade: req.body.localidade,
            uf: req.body.uf,
            estado: req.body.estado,
            ddd: req.body.ddd,
            usuario: {
                email: req.body.usuario.email,
                senha: req.body.usuario.senha,
                tipoUsuario: req.body.usuario.tipoUsuario,
                telefone: req.body.usuario.telefone,
                nomeCompleto: req.body.usuario.nomeCompleto
            }
        });

        const savedCliente = await cliente.save();
        return res.status(201).json(savedCliente);
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao cadastrar cliente.` });
    }
};

exports.updateCliente = async function (req, res) {
    try {
        const { id } = req.params;

        const updatedCliente = await Cliente.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedCliente) {
            return res.status(404).send({ message: 'Cliente não encontrado.' });
        }

        return res.status(200).json(updatedCliente);
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao atualizar o cliente.` });
    }
};

exports.deleteCliente = async function (req, res) {
    try {
        const { id } = req.params;

        const deletedCliente = await Cliente.findByIdAndDelete(id);

        if (!deletedCliente) {
            return res.status(404).send({ message: 'Cliente não encontrado.' });
        }

        return res.status(200).send({ message: 'Cliente deletado com sucesso.' });
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao deletar o cliente.` });
    }
};

exports.details = async function (req, res) {
    try {
        const result = await Cliente.findById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

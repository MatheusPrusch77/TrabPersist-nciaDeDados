var Servico = require('../models/servicoModel');

// Método para listar todos os serviços
exports.getServico = async function (req, res) {
    try {
        const result = await Servico.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Método para criar um serviço
exports.create = function (req, res) {
    let servico = new Servico({
        _id: req.body._id,
        nome: req.body.nome,
        valor: req.body.valor,
        tipoServico: req.body.tipoServico
    });

    servico.save()
        .then(() => {
            res.status(201).send(servico.toJSON());  // Envia a resposta após salvar o serviço
        })
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar serviço.` });
        });
};

// Método para atualizar um serviço
exports.updateServico = async function (req, res) {
    try {
        const { id } = req.params; 
        const { nome, valor, tipoServico } = req.body; 

        // Verifica se todos os campos obrigatórios foram fornecidos
        if (!nome || !valor || !tipoServico) {
            return res.status(400).send({ message: 'Os campos "nome", "valor" e "tipoServico" são obrigatórios para atualização.' });
        }

        // Atualiza o serviço e retorna os dados atualizados
        const updatedServico = await Servico.findByIdAndUpdate(id, { nome, valor, tipoServico }, { new: true });

        if (!updatedServico) {
            return res.status(404).send({ message: 'Serviço não encontrado.' });
        }

        return res.status(200).json(updatedServico); 
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao atualizar o serviço.` });
    }
};

// Método para deletar um serviço
exports.deleteServico = async function (req, res) {
    try {
        const { id } = req.params; 

        // Deleta o serviço com o ID fornecido
        const deletedServico = await Servico.findByIdAndDelete(id);

        if (!deletedServico) {
            return res.status(404).send({ message: 'Serviço não encontrado.' });
        }

        return res.status(200).send({ message: 'Serviço deletado com sucesso.' });
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao deletar o serviço.` });
    }
};

// Método para obter detalhes de um serviço pelo ID
exports.details = async function (req, res) {
    try {
        const result = await Servico.findById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

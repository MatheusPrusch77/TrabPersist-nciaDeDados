var User = require('../models/userModel');

exports.getUser = async function (req, res){
    try {
        const result = await User.find();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            age: req.body.age
        }
    );
    user.save()
        .then((savedUser) => {

            return res.status(201).json(savedUser);
        })
        .catch((err) => {
  
            return res.status(500).send({ message: `${err.message} - Falha ao cadastrar usuário.` });
        });
};

exports.updateUser = async function (req, res) {
    try {
        const { id } = req.params; 
        const { name, age } = req.body; 

        if (!name || !age) {
            return res.status(400).send({ message: 'Os campos "name" e "age" são obrigatórios para atualização.' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { name, age }, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(updatedUser); 
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao atualizar o usuário.` });
    }
};

// Deletar um usuário
exports.deleteUser = async function (req, res) {
    try {
        const { id } = req.params; 

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).send({ message: 'Usuário deletado com sucesso.' });
    } catch (err) {
        return res.status(500).send({ message: `${err.message} - Falha ao deletar o usuário.` });
    }
};

exports.details = async function (req, res) {
    try {
        const result = await User.findById(req.params.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};
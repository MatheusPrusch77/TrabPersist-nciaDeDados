const Cliente = require('../models/clienteModel');
const Funcionario = require('../models/funcionarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar Cliente
exports.registerCliente = async (req, res) => {
    const {
        nomeCliente, telefone, endereco, cnpj, cep, logradouro, complemento, bairro, localidade,
        uf, estado, ddd, localizacao, usuario
    } = req.body;

    try {
        const cliente = new Cliente({
            nomeCliente,
            telefone,
            endereco,
            cnpj,
            cep,
            logradouro,
            complemento,  // Não é obrigatório, mas se vier deve ser armazenado
            bairro,
            localidade,
            uf,
            estado,
            ddd,
            localizacao,  // Inclui { type: 'Point', coordinates: [...] }
            usuario
        });
        await cliente.save();
        res.status(201).json({ message: 'Cliente registrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login de usuário (Cliente ou Funcionário)
exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Primeiro busca por cliente
        let user = await Cliente.findOne({ 'usuario.email': email });
        let tipoUsuario = 'cliente';

        // Se não for cliente, tenta encontrar o funcionário
        if (!user) {
            user = await Funcionario.findOne({ idUsuario: email }); // Usar idUsuario como email
            tipoUsuario = 'funcionario';
        }

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica a senha do cliente
        const isMatch = await bcrypt.compare(senha, user.usuario ? user.usuario.senha : ''); // Para cliente
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user._id, role: tipoUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

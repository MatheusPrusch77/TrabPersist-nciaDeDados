const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para registro de Clientes
router.post('/register', authController.registerCliente);

// Rota para login (tanto de Clientes quanto Funcionários)
router.post('/login', authController.loginUser);

module.exports = router;

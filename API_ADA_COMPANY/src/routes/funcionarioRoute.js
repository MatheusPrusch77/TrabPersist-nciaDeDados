const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const funcionarioController = require('../controllers/funcionarioController');


router.get('/funcionario', auth('funcionario'), funcionarioController.getFuncionarios); // Apenas funcionários autenticados podem ver
router.post('/funcionario', auth('funcionario'), funcionarioController.createFuncionario); // Apenas funcionários autenticados podem criar
router.put('/funcionario/:id', funcionarioController.updateFuncionario);
router.delete('/funcionario/:id', funcionarioController.deleteFuncionario);
router.get('/funcionario/:id', funcionarioController.getFuncionarioById);

module.exports = router;

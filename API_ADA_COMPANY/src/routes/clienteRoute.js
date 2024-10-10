const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.get('/cliente', clienteController.getClientes);
router.post('/cliente', clienteController.create);
router.put('/cliente/:id', clienteController.updateCliente);
router.delete('/cliente/:id', clienteController.deleteCliente);
router.get('/cliente/:id', clienteController.details);

module.exports = router;

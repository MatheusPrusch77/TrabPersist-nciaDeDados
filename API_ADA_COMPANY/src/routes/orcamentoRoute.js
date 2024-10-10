const express = require('express');
const router = express.Router();

const orcamentoController = require('../controllers/orcamentoController');

router.get('/orcamento', orcamentoController.getOrcamento);
router.post('/orcamento', orcamentoController.create);
router.put('/orcamento/:id', orcamentoController.updateOrcamento);
router.delete('/orcamento/:id', orcamentoController.deleteOrcamento);
router.get('/orcamento/:id', orcamentoController.details);

module.exports = router;

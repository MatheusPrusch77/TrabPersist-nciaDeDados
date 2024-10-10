const express = require('express');
const router = express.Router();

const servicoController = require('../controllers/servicoController');

router.get('/servico', servicoController.getServico);
router.post('/servico', servicoController.create);
router.put('/servico/:id', servicoController.updateServico);
router.delete('/servico/:id', servicoController.deleteServico);
router.get('/servico/:id', servicoController.details);

module.exports = router;

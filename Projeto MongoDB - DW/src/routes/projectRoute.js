const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController');

router.get('/project', projectController.getProject);
router.post('/project', projectController.create);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);
router.get('/project/:id', projectController.details);

module.exports = router;    
const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/tasks/:id', TaskController.index);
router.get('/tasks/tareasestado/:estado', TaskController.getTareasPorEstado);
router.get('/task/:id', TaskController.getTarea);
router.get('/tasksEst/:id', TaskController.getTareasEst);
// router.get('/create/', TaskController.create);
router.post('/create/', TaskController.store);
router.post('/tasks/delete/:id', TaskController.destroy);
router.post('/tasks/deletePorProyecto/:id', TaskController.destroyPorProyecto);
router.get('/tasks/edit/:id', TaskController.edit);
router.post('/tasks/edit/', TaskController.update);
router.post('/tasks/estado/:id', TaskController.updateEstado);

module.exports = router;
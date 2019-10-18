const express = require('express');
const router = express.Router();
const task_controller = require('../controller/task.controller');
const middleware = require('../config/middleware');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', task_controller.tasks);
router.post('/create', task_controller.task_create);
router.put('/:id/update', task_controller.task_update);
router.post('/:id/delete', task_controller.task_delete);


module.exports = router;

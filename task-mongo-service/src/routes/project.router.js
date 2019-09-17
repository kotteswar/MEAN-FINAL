const express = require('express');
const router = express.Router();
const project_controller = require('../controller/project.controller');
const middleware = require('../config/middleware');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', middleware.tokenValidation, project_controller.projects);
router.post('/create', middleware.tokenValidation, project_controller.project_create);
router.put('/:id/update', middleware.tokenValidation, project_controller.project_update);
router.post('/:id/delete', middleware.tokenValidation, project_controller.project_delete);


module.exports = router;
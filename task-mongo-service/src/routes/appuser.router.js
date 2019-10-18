const express = require('express');
const router = express.Router();
const appuser_controller = require('../controller/appuser.controller');
const middleware = require('../config/middleware');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/',  appuser_controller.appusers);
router.post('/create',  appuser_controller.appuser_create);
router.put('/:id/update',  appuser_controller.appuser_update);
router.post('/:id/delete',  appuser_controller.appuser_delete);


module.exports = router;
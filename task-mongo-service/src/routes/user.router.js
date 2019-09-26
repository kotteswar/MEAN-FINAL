const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user.controller');
const middleware = require('../config/middleware');

router.get('/', user_controller.users);
router.post('/login', user_controller.user_login);
router.get('/:id', user_controller.user_details);
router.post('/signup',user_controller.user_create);
router.post('/create', user_controller.user_create);
router.post('/:id/update', user_controller.user_update);
router.delete('/:id/delete', user_controller.user_delete);
router.post('/:id/resetcode',user_controller.user_reset);
router.post('/:id/resetpwd',user_controller.user_reset_pwd);


module.exports = router;
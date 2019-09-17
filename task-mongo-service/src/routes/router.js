var express = require('express')
var router = express.Router();
var cors = require('cors');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(cors());
router.use('/users', require('./user.router'));
router.use('/task', require('./task.router'));
router.use('/appuser', require('./appuser.router'));
router.use('/project', require('./project.router'));

module.exports = router;
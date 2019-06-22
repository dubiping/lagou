var express = require('express');
var router = express.Router();

const UserController = require('../controllers/users')

/* GET users listing. */
router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)
router.get('/issignin', UserController.isSignin)

module.exports = router;

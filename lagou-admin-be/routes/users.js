var express = require('express');
var router = express.Router();

const UserController = require('../controllers/users')

/* GET users listing. */
router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)
router.get('/isSignin', UserController.isSignin)
router.get('/signout', UserController.signout)

module.exports = router;

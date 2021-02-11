const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.get('/users', userCtrl.GetAllUsers);
router.get('/users/:id', userCtrl.getOneUser);
router.post('/login', userCtrl.login);

module.exports = router;
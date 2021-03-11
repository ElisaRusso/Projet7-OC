const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const isAdmin = require('../middleware/isAdmin');

router.post('/signup', userCtrl.signup);
router.get('/users', isAdmin, userCtrl.GetAllUsers);
router.delete('/users/:id', isAdmin, userCtrl.deleteUser);
router.get('/user/:username', userCtrl.getOneUserByUsername);
router.get('/users/:id', userCtrl.getOneUser);
router.post('/login', userCtrl.login);

module.exports = router;
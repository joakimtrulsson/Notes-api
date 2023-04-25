const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

// router.use(userController.protect);
router.get('/logout', userController.logout);

module.exports = router;

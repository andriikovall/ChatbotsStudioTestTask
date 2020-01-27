const express = require('express');
const {
  checkLoginAndPassword,
  login,
  register,
  responseOnSuccesLogin,
} = require('../controllers/auth');

const router = express.Router();

router.post('/login', checkLoginAndPassword, login, responseOnSuccesLogin);
router.post('/register', checkLoginAndPassword, register);

module.exports = router;

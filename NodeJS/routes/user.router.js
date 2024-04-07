const express = require('express');

const {
  register,
  login,
  getUserByEmail,
} = require('../controllers/user.controller');

const upload = require('../services/upload.service');
const router = express.Router()

router.post('/', upload.single('image'), register)

router.post('/login', login)

router.get('/:email', getUserByEmail)

module.exports = router

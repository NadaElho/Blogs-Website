const express = require('express');

const {
  register,
  login,
  getUserByEmail,
  getResetPassword,
  forgotPassword,
} = require('../controllers/user.controller');

const upload = require('../services/upload.service');
const router = express.Router()
const uploadImage = require('../services/cloudinary.service');

router.post('/', upload.single('image'), uploadImage, register)
router.post('/login', login)
router.get('/:email', getUserByEmail)
router.post("/password/forgotpassword", forgotPassword)
router.post("/password/reset-password/:id/:token", getResetPassword)

module.exports = router

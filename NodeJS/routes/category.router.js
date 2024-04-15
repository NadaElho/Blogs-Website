const express = require('express')
const { auth } = require('../middleware/auth')
const { addCategory, deleteCategory, getAllCategories, editCategory } = require('../controllers/category.controller')

const upload = require('../services/upload.service')
const uploadImage = require('../services/cloudinary.service');

const router = express.Router()

router.post('/', upload.single('image'), uploadImage, auth, addCategory)
router.get('/', getAllCategories)
router.delete('/:id', auth, deleteCategory)
router.patch('/:id', upload.single('image'), uploadImage, auth, editCategory)
module.exports = router
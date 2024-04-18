const express = require('express')
const { auth } = require('../middleware/auth')
const { addCategory, deleteCategory, getAllCategories, editCategory } = require('../controllers/category.controller')
const { uploadImage, resizeImage } = require('../services/upload.service')
const { imagekitUpload } = require('../services/imagekit.service')


const router = express.Router()

router.post('/',auth, uploadImage, resizeImage, imagekitUpload, addCategory)
router.get('/', getAllCategories)
router.delete('/:id', auth, deleteCategory)
router.patch('/:id', auth, uploadImage, resizeImage, imagekitUpload, editCategory)
module.exports = router
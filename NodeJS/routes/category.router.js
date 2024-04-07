const express = require('express')
const { auth } = require('../middleware/auth')
const { addCategory, deleteCategory, getAllCategories } = require('../controllers/category.controller')

const upload = require('../services/upload.service')
const router = express.Router()

router.post('/', upload.single('image'), auth, addCategory)
router.get('/', getAllCategories)
router.delete('/:id', auth, deleteCategory)

module.exports = router
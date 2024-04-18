const express = require('express')
const { auth } = require('../middleware/auth')
const {
  getBlogs,
  addNewBlog,
  editBlog,
  getUserBlogs,
  getBlogDetails,
  deleteBlog,
  getCategoryBlogs,
  updateNumOfViews,
} = require('../controllers/blogs.controller')
const { uploadImage, resizeImage } = require('../services/upload.service')
const { imagekitUpload } = require('../services/imagekit.service')


const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlogDetails)
router.get('/category/:id', getCategoryBlogs)
router.get('/user/:id', getUserBlogs)
router.post('/', auth, uploadImage, resizeImage, imagekitUpload, addNewBlog)
router.patch('/:id',auth, uploadImage, resizeImage, imagekitUpload, editBlog)
router.patch('/views/:id', updateNumOfViews)
router.delete('/:id', auth, deleteBlog)
module.exports = router

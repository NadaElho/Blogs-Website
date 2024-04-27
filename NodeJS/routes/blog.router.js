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
const upload = require('../services/upload.service')
const uploadImage = require('../services/cloudinary.service');

const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlogDetails)
router.get('/category/:id', getCategoryBlogs)
router.get('/user/:id', getUserBlogs)
router.post('/', upload.single('image'),uploadImage, auth, addNewBlog)
router.patch('/:id',upload.single('image'), uploadImage, auth, editBlog)
router.patch('/views/:id', updateNumOfViews)
router.delete('/:id', auth, deleteBlog)
module.exports = router

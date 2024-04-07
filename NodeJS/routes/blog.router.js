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
} = require('../controllers/blogs.controller')
const upload = require('../services/upload.service')
const uploadImage = require('../services/cloudinary.service');

const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlogDetails)
router.get('/category/:id', getCategoryBlogs)
router.get('/user/:id', auth, getUserBlogs)
router.post('/', upload.single('image'),uploadImage, auth, addNewBlog)
router.patch('/:id',upload.single('image'), uploadImage, auth, editBlog)
router.delete('/:id', auth, deleteBlog)
module.exports = router

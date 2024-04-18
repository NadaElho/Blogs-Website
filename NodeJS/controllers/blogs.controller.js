const Blog = require('../models/blog.model')
const Category = require('../models/category.model')
const { deleteImage } = require('../services/imagekit.service')

const getBlogs = async (req, res) => {
  let blogs = await Blog.find().populate('category').populate('userId')
  res.status(200).send(blogs)
}

const getBlogDetails = async (req, res) => {
  let blogs = await Blog.findById(req.params.id)
    .populate('category')
    .populate('userId')
  res.status(200).send(blogs)
}

const addNewBlog = async (req, res) => {
  var datetime = new Date().toISOString().slice(0, 10)
  await Blog.create({
    ...req.body,
    fileId: req.fileId,
  })
  res.status(201).send('Blog added successfully')
}

const editBlog = async (req, res) => {
  try {
    const { title, description, content, category, image } = req.body
    const blog = await Blog.findOne({ _id: req.params.id });
    if (image) {
      await deleteImage(blog.fileId);
      await Blog.updateOne(
        { _id: req.params.id },
        { title, description, image, content, category , fileId:req.fileId },
      )
    } else {
      await Blog.updateOne(
        { _id: req.params.id },
        { title, description, content, category , fileId:req.fileId },
      )
    }

    res.status(200).send('Blog updated successfully')
  } catch (err) {
    console.log(err);
    res.status(400).send('Error happened: ' + err.message)
  }
}

const updateNumOfViews = async (req, res) => {
  const { id } = req.params
  await Blog.updateOne({ _id: id }, { $inc: { views: 1 } }, { new: true })
  res.status(200).send('No of views increased')
}

const getUserBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({ userId: req.params.id })
      .populate('category')
      .populate('userId')
    if (!blogs) {
      res.status(404).send('No blogs written by this user')
    }
    res.status(200).send(blogs)
  } catch (err) {
    res.status(400).send('Error happened: ' + err.message)
  }
}

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id })
    if (!blog) {
      return res.status(404).send('Blog not found')
    }

    await deleteImage(blog.fileId)
    await Blog.deleteOne({ _id: req.params.id })

    res.status(200).send('deleted successfully')
  } catch (err) {
    res.status(400).send('Error happened: ' + err.message)
  }
}

const getCategoryBlogs = async (req, res) => {
  try {
    let blogs = await Blog.find({ category: req.params.id })
      .populate('category')
      .populate('userId')
    if (!blogs) {
      res.status(404).send('No blogs in this category')
    }
    res.status(200).send(blogs)
  } catch (err) {
    res.status(400).send('Error happened: ' + err.message)
  }
}
module.exports = {
  getBlogs,
  addNewBlog,
  editBlog,
  getUserBlogs,
  getBlogDetails,
  deleteBlog,
  getCategoryBlogs,
  updateNumOfViews,
}

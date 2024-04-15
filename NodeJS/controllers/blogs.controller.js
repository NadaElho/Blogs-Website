const Blog = require('../models/blog.model')
const Category = require('../models/category.model')

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
  const { title, description, userId, content, category } = req.body
  const imageUrl = req.imageUrl

  var datetime = new Date().toISOString().slice(0, 10)
  await Blog.create({
    title,
    description,
    userId,
    image: imageUrl,
    date: datetime,
    content,
    category,
  })
  res.status(201).send('Blog added successfully')
}

const editBlog = async (req, res) => {
  try {
    const { title, description, content, category } = req.body
    const imageUrl = req.imageUrl
    console.log(imageUrl)
    if (imageUrl) {
      await Blog.updateOne(
        { _id: req.params.id },
        { title, description, image: imageUrl, content, category },
      )
    } else {
      await Blog.updateOne(
        { _id: req.params.id },
        { title, description, content, category },
      )
    }

    res.status(200).send('Blog updated successfully')
  } catch (err) {
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

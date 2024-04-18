const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date:{
    type: String
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  views:{
    type: Number,
    default: 0
  },
  fileId: {
    type: String
  }
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog

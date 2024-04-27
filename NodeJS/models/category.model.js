const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name_en: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  },
  description_en: {
    type: String,
    required: true,
  },
  description_ar: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category

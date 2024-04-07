const Category = require('../models/category.model')

const addCategory = async (req, res) => {
  const { name_en, name_ar, color, description_en, description_ar } = req.body
  await Category.create({
    name_en,
    name_ar,
    color,
    image: req.file.filename,
    description_en,
    description_ar,
  })
  res.status(201).send({ message: 'Category added successfully' })
}

const getAllCategories = async (req, res) => {
  let data = await Category.find()
  res.status(200).send({ data })
}

const deleteCategory = async (req, res) => {
  await findByIdAndDelete(req.params.id)
  res.status(201).send({ message: 'Category deleted successfully' })
}

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
}

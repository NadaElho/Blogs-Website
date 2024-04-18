const Category = require('../models/category.model')
const { deleteImage } = require('../services/imagekit.service')

const addCategory = async (req, res) => {
  console.log(req);
  await Category.create({
    ...req.body,
    fileId: req.fileId
  })
  res.status(201).send({ message: 'Category added successfully' })
}

const getAllCategories = async (req, res) => {
  let data = await Category.find()
  res.status(200).send({ data })
}

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
        return res.status(404).send("category not found");
    }
    
    await deleteImage(category.fileId)
    await Category.deleteOne({ _id: req.params.id });

    res.status(200).send("deleted successfully");
} catch (err) {
    res.status(400).send("Error happened: " + err.message);
}
}


const editCategory = async (req, res) => {
  try {
      const { name_en, name_ar, description_en, description_ar, color } = req.body;
      
      if (req.body.image) {
          await Category.updateOne({ _id: req.params.id }, { name_en, name_ar, description_en, description_ar, color, image: req.body.image });
      } else {
          await Category.updateOne({ _id: req.params.id }, { name_en, name_ar, description_en, description_ar, color });
      }

      res.status(200).send("Category updated successfully");
  } catch (err) {
      res.status(400).send("Error happened: " + err.message);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
  editCategory
}

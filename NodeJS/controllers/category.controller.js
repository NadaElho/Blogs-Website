const Category = require('../models/category.model')

const addCategory = async (req, res) => {
  const { name_en, name_ar, color, description_en, description_ar } = req.body
  const imageUrl = req.imageUrl;

  await Category.create({
    name_en,
    name_ar,
    color,
    image: imageUrl,
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
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
        return res.status(404).send("category not found");
    }
    
    await Category.deleteOne({ _id: req.params.id });

    res.status(200).send("deleted successfully");
} catch (err) {
    res.status(400).send("Error happened: " + err.message);
}
}


const editCategory = async (req, res) => {
  try {
      const { name_en, name_ar, description_en, description_ar, color } = req.body;
      const imageUrl = req.imageUrl;
      console.log(imageUrl);
      if (imageUrl) {
          await Category.updateOne({ _id: req.params.id }, { name_en, name_ar, description_en, description_ar, color, image: imageUrl });
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

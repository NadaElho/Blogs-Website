const multer = require('multer')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid')
const multerStorage = multer.memoryStorage()

const multerFilter = function (req, file, cb) {
  if (file) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true)
    } else {
      cb(new ApiError('only images', 400), false)
    }
  }
}
const upload = multer({ storage: multerStorage, fileFilter: multerFilter })


const uploadImage = upload.single('image')
const resizeImage = async (req, res, next) => {
  try {
    if (req.file && req.file.fieldname == 'image') {
      const filename = ` post-${uuidv4()}-${Date.now()}.jpeg`

      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })

      req.body.image = filename
    }
    next()
  } catch (error) {
    console.log(error.message)
    res.status(404).json('Invalid request' + error.message)
    return
  }
}
module.exports = {
  uploadImage,
  resizeImage
}

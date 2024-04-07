const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dgaic4aj8',
  api_key: '159774316676778',
  api_secret: 'ePL7lSY6tSzD2ujgFwtDDRkiDXc',
})

const uploadImage = async (req, res, next) => {
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path)
        req.imageUrl = result.secure_url;
    }
  next()
}

module.exports = uploadImage

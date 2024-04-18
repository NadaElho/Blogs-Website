var ImageKit = require('imagekit')

var imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
})

const imagekitUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next()
    }

    await imageKit.upload(
      {
        file: req.file.buffer,
        fileName: req.body.image,
        folder: 'uploads',
      },
      function (err, response) {
        if (err) {
          return res.status(500).json({
            status: 'failed',
            message: 'An error occurred during file upload. Please try again.',
          })
        }
        req.fileId = response.fileId
        req.body.image = response.url
        next()
      },
    )
  } catch (error) {
    console.log('Error uploading image to imagekit:', error.message)
    res.status(500).json({
      status: 'failed',
      message: 'An error occurred during file upload. Please try again.',
    })
  }
}

const deleteImage = async (image) => {
  imageKit.deleteFile(image, function (err, result) {
    if (err) {
      console.log('Error deleting old image:', err.message)
    } else {
      console.log('Old image deleted successfully')
    }
  })
}

module.exports = {
  imagekitUpload,
  deleteImage,
}

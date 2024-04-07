const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passHah: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User

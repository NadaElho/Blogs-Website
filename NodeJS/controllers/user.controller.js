const { findUserByEmail, registerUser } = require('../services/user.service')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!email || !password) {
    return res.status(422).send({ message: 'missing email or password' })
  }

  const user = await findUserByEmail(email)

  if (user) return res.send({ message: 'email already exists' })

  const passHah = await bcrypt.hash(password, 10)

  const newUser = await registerUser({
    name,
    email,
    passHah,
    image: req.file.filename,
  })

  res.send(newUser)
}

const login = async (req, res) => {

  const {email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ message: 'missing email or password' })
  }
  const user = await findUserByEmail(email)

  if (!user) return res.status(401).send({ message: 'register first' })

  const isValid = await bcrypt.compare(password, user.passHah)
  if (!isValid) return res.status(401).send({ message: 'incorrect email or password' })

  const token = jwt.sign({ email }, 'secrettokenkey', { expiresIn: '1d' })

  res.header({ jwt: token }).send({ token, email, id: user._id })
}
const getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email })
  if (!user) {
    res.status(404).send('user not found')
    return
  }
  res.send(user)
}

module.exports = {
  register,
  login,
  getUserByEmail,
}

const { findUserByEmail, registerUser } = require('../services/user.service')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const nodemailer = require('nodemailer')

const register = async (req, res) => {
  const { name, email, password, image } = req.body
  if (!email || !password) {
    return res.status(422).send({ message: 'missing email or password' })
  }

  const user = await findUserByEmail(email)

  if (user) return res.status(422).send({ message: 'email already exists' })

  const passHah = await bcrypt.hash(password, 10)

  const newUser = await registerUser({
    name,
    email,
    passHah,
    image,
    fileId: req.fileId
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

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404).send('There is no user with this email')
  }
  const secret = 'myjwtsecret' + user.passwordHash
  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: '15m',
  })

  const link = `https://blogs-website-gamma.vercel.app/reset-password/${user._id}/${token}`
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  })

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: 'Reset password',
    html: `<div>
    <h3>Hello, <span style='color: #f8b810'>${user.name}</span></h3>
    <h4>Click on the link below to reset yor password</h4>
    <p>${link}</p>
    </div>`,
  }
  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent: ' + success.response)
    }
  })
  res.send('Check your email')
}

const getResetPassword = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).send('There is no user with this id')
  }
  const secret = 'myjwtsecret' + user.passwordHash
  try {
    jwt.verify(req.params.token, secret)
    const newPass = await bcrypt.hash(req.body.password, 10)
    await User.updateOne({ _id: req.params.id }, { passwordHash: newPass })
    res.status(200).send('Password reset successfully')
  } catch (err) {
    console.log(err)
    res.status(401).send('Expired token')
  }
}

module.exports = {
  register,
  login,
  getUserByEmail,
  forgotPassword,
  getResetPassword
}

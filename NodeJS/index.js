require('dotenv').config()
require('./db')

const express = require('express')
const cors = require('cors')

const { auth } = require('./middleware/auth.js')
const userRouter = require('./routes/user.router.js')
const blogRouter = require('./routes/blog.router.js')
const catRouter = require('./routes/category.router.js')

const app = express()

app.use(cors());

app.use(express.json())

app.use('/uploads', express.static('uploads'))
app.use(`${process.env.API_URL}users`, userRouter)
app.use(`${process.env.API_URL}blogs`, blogRouter)
app.use(`${process.env.API_URL}categories`, catRouter)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Listening on port ${port} ....`)
})

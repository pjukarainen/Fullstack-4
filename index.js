const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const mongoUrl = 'mongodb://@ds247058.mlab.com:47058/blogilista'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.logger)
/*
app.use(middleware.error)
*/
app.use('/api/blogs', blogRouter)



const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
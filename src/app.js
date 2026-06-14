const express = require('express')
const routes = require('./routes')
const app = express()

const LoggerMiddleware = require('./middlewares/logger.js')
const errorHandler = require('./middlewares/errorHandler.js')


// Middleware to process JSON data in the req body
app.use(express.json())
// Middleware to process HTML forms data
app.use(express.urlencoded({ extended: true }))
app.use(LoggerMiddleware)


app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(errorHandler)

module.exports = app

const express = require('express')
const api = require('./api')
const middleware = require('./middleware')

const app = express()

middleware.pre(app)

app.use('/api', api)

middleware.post(app)

module.exports = app

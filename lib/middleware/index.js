
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = {
  pre: app => {
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cors())
  },

  post: app => {
    app.use(function (err, req, res, next) {
      console.log(err)
      res.status(500).json({ code: 'UNKNOWN_ERROR', message: err.message })
    })
  },

  wrapper: fn => async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

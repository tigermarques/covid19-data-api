const Provider = require('./model')

const getByCode = code => Provider.findOne({ code }).exec()

module.exports = {
  getByCode
}

const Country = require('./model')

const getAll = async () => {
  return Country.find({}).exec()
}

const getByCode = async (code) => {
  return Country.findOne({ code }).exec()
}

module.exports = {
  getAll,
  getByCode
}

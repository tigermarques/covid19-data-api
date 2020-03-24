const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    defaultPrecedence: {
      type: Number,
      required: true,
      default: 0
    },
    precedenceList: [{
      countryCode: {
        type: String,
        required: true
      },
      precedence: {
        type: Number,
        required: true
      }
    }]
  },
  { timestamps: true }
)

schema.methods.getPrecedence = function (countryCode) {
  let response = this.defaultPrecedence
  const precedence = this.precedenceList.find(item => item.countryCode === countryCode)
  if (precedence) {
    response = precedence.precedence
  }
  return response
}

schema.methods.hasHigherPrecedence = function (otherProvider, countryCode) {
  return this.getPrecedence(countryCode) > otherProvider.getPrecedence(countryCode)
}

const model = mongoose.model('provider', schema)

module.exports = model

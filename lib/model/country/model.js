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
    population: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

const model = mongoose.model('countrie', schema)

module.exports = model

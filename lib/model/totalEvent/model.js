const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    // IDENTIFICATION
    recordDate: {
      type: String,
      required: true
    },
    countryCode: {
      type: String,
      required: true
    },
    countryName: {
      type: String,
      required: true
    },
    sourceCode: {
      type: String,
      required: true
    },

    // DATA
    confirmations: {
      type: Number,
      required: true
    },
    deaths: {
      type: Number,
      required: true
    },
    recoveries: {
      type: Number,
      required: true
    },

    // PROCESSING
    hasBeenProcessed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

schema.index({ recordDate: 1, countryCode: 1, sourceCode: 1 }, { unique: true })

const model = mongoose.model('totalEvent', schema)

module.exports = model

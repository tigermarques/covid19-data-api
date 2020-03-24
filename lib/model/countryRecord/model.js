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
    source: String,

    // TOTALS
    totalConfirmations: {
      type: Number,
      required: true
    },
    totalDeaths: {
      type: Number,
      required: true
    },
    totalRecoveries: {
      type: Number,
      required: true
    },
    totalActives: {
      type: Number,
      required: true
    },

    // DAILY
    newConfirmations: {
      type: Number,
      required: true
    },
    newDeaths: {
      type: Number,
      required: true
    },
    newRecoveries: {
      type: Number,
      required: true
    },

    // ACTIVE CASES DISTRIBUTION
    recoveringAtHome: Number,
    recoveringAtHospital: Number,
    recoveringAtICU: Number,

    // COMPUTED STUFF
    confirmationsPerMillion: {
      type: Number,
      required: true
    },
    deathsPerMillion: {
      type: Number,
      required: true
    },
    recoveriesPerMillion: {
      type: Number,
      required: true
    },
    deathRateV1: {
      type: Number,
      required: true
    },
    deathRateV2: {
      type: Number,
      required: true
    },
    recoveryRateV1: {
      type: Number,
      required: true
    },
    recoveryRateV2: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

schema.index({ recordDate: 1, countryCode: 1 }, { unique: true })

const model = mongoose.model('countryRecord', schema)

module.exports = model

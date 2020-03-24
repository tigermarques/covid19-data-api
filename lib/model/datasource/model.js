const mongoose = require('mongoose')
const crypto = require('crypto')

const getHash = fileContent => {
  return crypto.createHash('md5').update(fileContent).digest('hex')
}

const schema = new mongoose.Schema(
  {
    sourceCode: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    consultedOn: {
      type: String,
      required: true
    },
    fileContent: {
      type: String,
      required: true
    },
    fileHash: {
      type: String
    }
  },
  { timestamps: true }
)

schema.pre('save', function (next) {
  if (!this.isModified('fileContent')) {
    next()
  }
  const hash = getHash(this.fileContent)
  this.fileHash = hash
  next()
})

schema.statics.hasDigestedFile = function (sourceCode, fileName, fileContent) {
  const hash = getHash(fileContent)
  return this.exists({
    sourceCode,
    fileName: fileName,
    fileHash: hash
  })
}

const model = mongoose.model('dataSource', schema)

module.exports = model

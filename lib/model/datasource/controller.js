const DataSource = require('./model')

const add = async (sourceCode, fileName, fileContent) => {
  const date = new Date()
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0))
  const existingDataSource = await DataSource.findOne({
    sourceCode,
    fileName: fileName
  })
  if (existingDataSource) {
    existingDataSource.fileContent = fileContent
    existingDataSource.consultedOn = utcDate.toISOString()
    await existingDataSource.save()
  } else {
    const newDataSource = new DataSource({
      sourceCode,
      fileName,
      fileContent,
      consultedOn: utcDate.toISOString()
    })
    await newDataSource.save()
  }
}

const hasBeenProcessed = async (sourceCode, fileName, fileContent) => {
  return DataSource.hasDigestedFile(sourceCode, fileName, fileContent)
}

module.exports = {
  add,
  hasBeenProcessed
}

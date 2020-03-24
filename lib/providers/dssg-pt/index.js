const path = require('path')
const fs = require('fs')
const parseCSV = require('csv-parse/lib/sync')
const countryUtils = require('../../utils/country')
const providerModel = require('../../model/provider')
const datasourceModel = require('../../model/datasource')
const totalEventModel = require('../../model/totalEvent')
const countryModel = require('../../model/country')

const PROVIDER_CODE = 'DGS_PT'
const BASE_DIRECTORY = path.resolve(__dirname, '..', '..', '..', 'dssg-pt_covid19pt-data')
let PROVIDER

const getDataFromCSV = fileContent => {
  const records = parseCSV(fileContent, {
    columns: true,
    delimiter: ',',
    skip_empty_lines: true
  })

  return records.map(item => {
    const countryCode = 'PT'
    const countryName = countryUtils.getNameByCode(countryCode)
    const [day, month, year] = item.data.split('-')
    const recordDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
    return {
      recordDate,
      countryName: countryName,
      countryCode: countryCode,
      confirmations: Number(item.confirmados),
      deaths: Number(item.obitos),
      recoveries: Number(item.recuperados)
    }
  })
}

const mapRecordToEvent = record => {
  return {
    date: record.recordDate,
    countryCode: record.countryCode,
    countryName: record.countryName,
    sourceCode: PROVIDER.code,
    confirmations: record.confirmations,
    deaths: record.deaths,
    recoveries: record.recoveries
  }
}

const processFile = async (fileContent) => {
  const countries = await countryModel.getAll()
  const countryCodes = countries.map(item => item.code)

  const processedDataRecords = getDataFromCSV(fileContent).filter(item => countryCodes.indexOf(item.countryCode) !== -1)

  const events = processedDataRecords.map(mapRecordToEvent)

  const existingEvents = await totalEventModel.getBySource(PROVIDER.code)

  const eventsToAdd = events.filter(event => !existingEvents.find(event2 => event2.countryCode === event.countryCode &&
      event2.recordDate === event.date.toISOString()))

  await totalEventModel.addMany(PROVIDER.code, eventsToAdd)
}

const getFiles = () => {
  const files = fs.readdirSync(BASE_DIRECTORY)

  return files.filter(fileName => fileName.endsWith('.csv'))
}

const checkIfFileHasBeenProcessed = async (fileName, fileContent) => {
  return datasourceModel.hasBeenProcessed(PROVIDER.code, fileName, fileContent)
}

const markFileProcessed = async (fileName, fileContent) => {
  return datasourceModel.add(PROVIDER.code, fileName, fileContent)
}

const refresh = async function () {
  if (!PROVIDER) {
    PROVIDER = await providerModel.getByCode(PROVIDER_CODE)
  }
  const fileList = getFiles()
  for (let i = 0; i < fileList.length; i++) {
    const fileName = fileList[i]
    const fileContent = fs.readFileSync(path.resolve(BASE_DIRECTORY, fileName), 'utf8')
    const hasBeenProcessed = await checkIfFileHasBeenProcessed(fileName, fileContent)
    if (!hasBeenProcessed) {
      console.log(`Need to process file ${fileName}`)

      await processFile(fileContent)

      await markFileProcessed(fileName, fileContent)
    }
  }
}

module.exports = {
  refresh
}

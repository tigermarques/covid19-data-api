const path = require('path')
const fs = require('fs')
const countryUtils = require('../../utils/country')
const providerModel = require('../../model/provider')
const datasourceModel = require('../../model/datasource')
const totalEventModel = require('../../model/totalEvent')
const countryModel = require('../../model/country')

const PROVIDER_CODE = 'PCM_DPC'
const BASE_DIRECTORY = path.resolve(__dirname, '..', '..', '..', 'pcm-dpc_COVID-19', 'dati-json')
let PROVIDER

const getDataFromCSV = fileContent => {
  const records = JSON.parse(fileContent)

  return records.map(item => {
    const countryCode = 'IT'
    const countryName = countryUtils.getNameByCode(countryCode)
    const [year, month, day] = item.data.substring(0, 10).split('-')
    const recordDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
    return {
      recordDate,
      countryName: countryName,
      countryCode: countryCode,
      confirmations: Number(item.totale_casi),
      deaths: Number(item.deceduti),
      recoveries: Number(item.dimessi_guariti)
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

  return files.filter(fileName => fileName === 'dpc-covid19-ita-andamento-nazionale.json')
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

const path = require('path')
const fs = require('fs')
const parseCSV = require('csv-parse/lib/sync')
const countryUtils = require('../../utils/country')
const providerModel = require('../../model/provider')
const datasourceModel = require('../../model/datasource')
const totalEventModel = require('../../model/totalEvent')
const countryModel = require('../../model/country')

const PROVIDER_CODE = 'JOHN_HOPKINS'
const BASE_DIRECTORY = path.resolve(__dirname, '..', '..', '..', 'CSSEGISandData_COVID-19', 'csse_covid_19_data', 'csse_covid_19_daily_reports')
let PROVIDER

const getDataFromCSV = fileContent => {
  const records = parseCSV(fileContent, {
    columns: true,
    delimiter: ',',
    skip_empty_lines: true
  })

  return Object.values(records.map(item => {
    const countryCode = countryUtils.getCodeByName(item['Country/Region'])
    const countryName = countryUtils.getNameByCode(countryCode)
    return {
      countryName: countryName,
      countryCode: countryCode,
      confirmations: Number(item.Confirmed),
      deaths: Number(item.Deaths),
      recoveries: Number(item.Recovered)
    }
  }).filter(item => item.countryCode).reduce((accumulator, currentValue) => {
    if (!(currentValue.countryCode in accumulator)) {
      accumulator[currentValue.countryCode] = {
        countryName: currentValue.countryName,
        countryCode: currentValue.countryCode,
        confirmations: 0,
        deaths: 0,
        recoveries: 0
      }
    }
    accumulator[currentValue.countryCode].confirmations += currentValue.confirmations
    accumulator[currentValue.countryCode].deaths += currentValue.deaths
    accumulator[currentValue.countryCode].recoveries += currentValue.recoveries
    return accumulator
  }, {}))
}

const mapRecordToEvent = date => record => {
  return {
    date: date,
    countryCode: record.countryCode,
    countryName: record.countryName,
    sourceCode: PROVIDER.code,
    confirmations: record.confirmations,
    deaths: record.deaths,
    recoveries: record.recoveries
  }
}

const processFile = async (fileDate, fileContent) => {
  const countries = await countryModel.getAll()
  const countryCodes = countries.map(item => item.code)

  const processedDataRecords = getDataFromCSV(fileContent).filter(item => countryCodes.indexOf(item.countryCode) !== -1)

  const events = processedDataRecords.map(mapRecordToEvent(fileDate))

  const existingEvents = await totalEventModel.getBySourceAndDate(PROVIDER.code, fileDate)

  const eventsToAdd = events.filter(event => !existingEvents.find(event2 => event2.countryCode === event.countryCode))

  await totalEventModel.addMany(PROVIDER.code, eventsToAdd)
}

const getFiles = () => {
  const files = fs.readdirSync(BASE_DIRECTORY)

  return files.filter(fileName => fileName.endsWith('.csv'))
}

const getDateFromFilename = fileName => {
  const [datePart] = fileName.split('.')
  const [month, day, year] = datePart.split('-')
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
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
    const fileDate = getDateFromFilename(fileName)
    const hasBeenProcessed = await checkIfFileHasBeenProcessed(fileName, fileContent)
    if (!hasBeenProcessed) {
      console.log(`Need to process file ${fileName}`)

      await processFile(fileDate, fileContent)

      await markFileProcessed(fileName, fileContent)
    }
  }
}

module.exports = {
  refresh
}

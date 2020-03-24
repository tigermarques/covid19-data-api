const CountryRecord = require('./model')
const countryModel = require('../country')
const providerModel = require('../provider')

const computeRateV1 = (cases, total) => {
  if (total > 0) {
    return cases / total
  }
  return 0
}

const computeRateV2 = (result1, result2) => {
  if (result1 + result2 > 0) {
    return result1 / (result1 + result2)
  }
  return 0
}

const filterRecord = record => {
  return {
    // IDENTIFICATION
    recordDate: record.recordDate,
    countryCode: record.countryCode,
    countryName: record.countryName,
    source: record.source,

    // TOTALS
    totalConfirmations: record.totalConfirmations,
    totalDeaths: record.totalDeaths,
    totalRecoveries: record.totalRecoveries,
    totalActives: record.totalActives,

    // DAILY
    newConfirmations: record.newConfirmations,
    newDeaths: record.newDeaths,
    newRecoveries: record.newRecoveries,

    // ACTIVE CASES DISTRIBUTION
    recoveringAtHome: record.recoveringAtHome,
    recoveringAtHospital: record.recoveringAtHospital,
    recoveringAtICU: record.recoveringAtICU,

    // COMPUTED STUFF
    confirmationsPerMillion: record.confirmationsPerMillion,
    deathsPerMillion: record.deathsPerMillion,
    recoveriesPerMillion: record.recoveriesPerMillion,
    deathRateV1: record.deathRateV1,
    deathRateV2: record.deathRateV2,
    recoveryRateV1: record.recoveryRateV1,
    recoveryRateV2: record.recoveryRateV2
  }
}

const getAll = async () => {
  return CountryRecord.find({}).exec()
}

const getByCode = async (code) => {
  return CountryRecord.findOne({ code }).exec()
}

const getRecordsForDay = async (date) => {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return CountryRecord.find({ recordDate: newDate.toISOString() }).exec().then(records => records.map(filterRecord))
}

const buildCountryRecordObject = (event, country, pastDayConfirmations, pastDayDeaths, pastDayRecoveries) => {
  return {
    recordDate: event.recordDate,
    countryCode: event.countryCode,
    countryName: event.countryName,
    source: event.sourceCode,
    // TOTALS
    totalConfirmations: event.confirmations,
    totalDeaths: event.deaths,
    totalRecoveries: event.recoveries,
    totalActives: event.confirmations - event.deaths - event.recoveries,
    // DAILY
    newConfirmations: event.confirmations - pastDayConfirmations,
    newDeaths: event.deaths - pastDayDeaths,
    newRecoveries: event.recoveries - pastDayRecoveries,
    // COMPUTED STUFF
    confirmationsPerMillion: 1000000 * event.confirmations / country.population,
    deathsPerMillion: 1000000 * event.deaths / country.population,
    recoveriesPerMillion: 1000000 * event.recoveries / country.population,
    deathRateV1: computeRateV1(event.deaths, event.confirmations),
    deathRateV2: computeRateV2(event.deaths, event.recoveries),
    recoveryRateV1: computeRateV1(event.recoveries, event.confirmations),
    recoveryRateV2: computeRateV2(event.recoveries, event.deaths)
  }
}

const processTotalEvent = async (event) => {
  console.log(`Processing day ${event.recordDate} for country ${event.countryCode}`)
  // 0. Get Country data
  const country = await countryModel.getByCode(event.countryCode)

  // 1. Check if record already exists
  const existingRecord = await CountryRecord.findOne({ recordDate: event.recordDate, countryCode: event.countryCode }).exec()

  // 2. Check if record from previous day exists
  const pastDay = new Date(event.recordDate)
  pastDay.setDate(pastDay.getDate() - 1)
  const pastDayRecord = await CountryRecord.findOne({ recordDate: pastDay.toISOString(), countryCode: event.countryCode }).exec()

  // 3. Save some values that may be needed from past day
  let pastDayConfirmations = 0
  let pastDayDeaths = 0
  let pastDayRecoveries = 0
  if (pastDayRecord) {
    pastDayConfirmations = pastDayRecord.totalConfirmations || 0
    pastDayDeaths = pastDayRecord.totalDeaths || 0
    pastDayRecoveries = pastDayRecord.totalRecoveries || 0
  }

  // 4. If record does not exist, create it
  if (!existingRecord) {
    console.log('Current record was not found. will create a new one')
    const newRecord = new CountryRecord(buildCountryRecordObject(event, country, pastDayConfirmations, pastDayDeaths, pastDayRecoveries))
    await newRecord.save()
  } else {
    // 5. Check precedence rules
    const currentProvider = await providerModel.getByCode(event.sourceCode)
    const otherProvider = await providerModel.getByCode(existingRecord.source)
    const hasHigherPrecedence = currentProvider.hasHigherPrecedence(otherProvider, event.countryCode)

    if (hasHigherPrecedence || existingRecord.source === event.sourceCode) {
      console.log('We are either the original source or have an higher precedence. Will replace the record')
      // 6. Replace data
      const newRecordObject = buildCountryRecordObject(event, country, pastDayConfirmations, pastDayDeaths, pastDayRecoveries)
      for (const prop in newRecordObject) {
        existingRecord[prop] = newRecordObject[prop]
      }
      await existingRecord.save()
    } else {
      console.log('We have a lower precedence. Will do nothing')
    }
  }
}

module.exports = {
  getAll,
  getByCode,
  getRecordsForDay,
  processTotalEvent
}

const TotalEvent = require('./model')

const addMany = async (sourceCode, rawEvents) => {
  const events = rawEvents.map(rawEvent => {
    const date = new Date(Date.UTC(rawEvent.date.getFullYear(), rawEvent.date.getMonth(), rawEvent.date.getDate(), 0, 0, 0))
    return {
      // IDENTIFICATION
      recordDate: date.toISOString(),
      countryCode: rawEvent.countryCode,
      countryName: rawEvent.countryName,
      sourceCode: sourceCode,

      // DATA
      confirmations: rawEvent.confirmations,
      deaths: rawEvent.deaths,
      recoveries: rawEvent.recoveries
    }
  })
  await TotalEvent.insertMany(events)
}

const getBySourceAndDate = async (sourceCode, recordDate) => {
  const date = new Date(Date.UTC(recordDate.getFullYear(), recordDate.getMonth(), recordDate.getDate(), 0, 0, 0))
  return TotalEvent.find({
    sourceCode: sourceCode,
    recordDate: date.toISOString()
  }).exec()
}

const getBySource = async (sourceCode) => {
  return TotalEvent.find({
    sourceCode: sourceCode
  }).exec()
}

const getNextEvent = () => {
  return TotalEvent.findOne({
    hasBeenProcessed: false
  }).sort('recordDate').exec()
}

const markEventProcessed = async event => {
  event.hasBeenProcessed = true
  await event.save()
}

module.exports = {
  getBySourceAndDate,
  getBySource,
  getNextEvent,
  markEventProcessed,
  addMany
}

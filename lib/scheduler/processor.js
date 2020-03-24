const countryRecordModel = require('../model/countryRecord')
const totalEventModel = require('../model/totalEvent')

let IS_RUNNING = false

const runProcessor = async () => {
  if (IS_RUNNING) {
    return
  }
  IS_RUNNING = true

  let nextEvent = await totalEventModel.getNextEvent()
  while (nextEvent) {
    console.log(`Will process event from ${nextEvent.countryCode} on ${nextEvent.recordDate}`)
    await countryRecordModel.processTotalEvent(nextEvent)
    await totalEventModel.markEventProcessed(nextEvent)

    nextEvent = await totalEventModel.getNextEvent()
  }

  IS_RUNNING = false

  setTimeout(runProcessor, process.env.EVENT_PROCESSOR_TIMEOUT)
}

module.exports = {
  start: runProcessor
}

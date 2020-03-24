const schedule = require('node-schedule')
const spawn = require('child_process').spawn
const processor = require('./processor')
const CSSEGISandData = require('../providers/CSSEGISandData')
const dssgPT = require('../providers/dssg-pt')
const pcmDPC = require('../providers/pcm-dpc')

const updateSubModules = () => {
  return new Promise((resolve, reject) => {
    const subModuleUpdate = spawn('git', ['submodule', 'update', '--init', '--remote'], {
      cwd: process.cwd(),
      env: {
        PATH: process.env.PATH
      }
    })

    subModuleUpdate.stdout.on('data', data => {
      console.log(data.toString())
    })

    subModuleUpdate.stderr.on('data', data => {
      console.log(data.toString())
    })

    subModuleUpdate.on('close', code => {
      console.log(`done with ${code}`)
      if (code === 0) {
        resolve()
      } else {
        reject(code)
      }
    })
  })
}

const refreshDatasources = async () => {
  console.log('here')

  await updateSubModules()

  await CSSEGISandData.refresh()
  await dssgPT.refresh()
  await pcmDPC.refresh()
}

module.exports = {
  start: async () => {
    await refreshDatasources()
    schedule.scheduleJob('0 0 * * * *', refreshDatasources)
    processor.start()
  }
}

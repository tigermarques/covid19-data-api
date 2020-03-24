const app = require('./lib/server')
const db = require('./lib/db')
const scheduler = require('./lib/scheduler')
const config = require('./lib/config')

db.connect()
  .then(() => {
    scheduler.start()
    app.listen(config.port)
  })
  .then(() => {
    console.log(`Server running on port ${config.port}`)
  }).catch(e => {
    console.log('Error...', e)
  })

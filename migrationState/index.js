const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

function MongoStore () {}

MongoStore.prototype.save = async (set, fn) => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = await client.db()
    const stateCollection = await db.collection('_migration-state')
    await stateCollection.deleteOne({})
    await stateCollection.insertOne({
      lastRun: set.lastRun,
      migrations: set.migrations
    })
    fn()
  } catch (e) {
    fn(e)
  }
}

MongoStore.prototype.load = async fn => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = await client.db()
    const stateCollection = await db.collection('_migration-state')
    const result = await stateCollection.findOne({})
    fn(null, result || {})
  } catch (e) {
    fn(e)
  }
}

module.exports = MongoStore

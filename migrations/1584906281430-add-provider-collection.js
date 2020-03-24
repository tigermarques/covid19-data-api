const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
require('dotenv').config()

module.exports.up = async function () {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = await client.db()
    const providersCollection = await db.createCollection('providers')
    assert.notDeepStrictEqual(providersCollection, null)
    await client.close()
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports.down = async function () {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = await client.db()
    const result = await db.dropCollection('providers')
    assert.deepStrictEqual(result, true)
    await client.close()
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports.description = 'create a new collection named "providers" to have all relevant data providers'

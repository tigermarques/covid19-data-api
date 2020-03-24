const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
require('dotenv').config()

module.exports.up = async function () {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = await client.db()
    const countriesCollection = await db.createCollection('countries')
    assert.notDeepStrictEqual(countriesCollection, null)
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
    const result = await db.dropCollection('countries')
    assert.deepStrictEqual(result, true)
    await client.close()
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports.description = 'create a new collection named "countries" to have all relevant countries'

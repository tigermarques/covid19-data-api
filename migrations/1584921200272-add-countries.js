const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
require('dotenv').config()

module.exports.up = async function () {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = await client.db()
    const countriesCollection = await db.collection('countries')
    assert.notDeepStrictEqual(countriesCollection, null)
    const result = await countriesCollection.insertMany([
      { code: 'PT', name: 'Portugal', population: 10562178 },
      { code: 'IT', name: 'Italy', population: 60317546 },
      { code: 'ES', name: 'Spain', population: 46733038 }
    ])
    assert.deepStrictEqual(result.result.ok, 1)
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
    const countriesCollection = await db.collection('countries')
    let result = await countriesCollection.deleteOne({ code: 'ES' })
    assert.deepStrictEqual(result.result.ok, 1)
    result = await countriesCollection.deleteOne({ code: 'IT' })
    assert.deepStrictEqual(result.result.ok, 1)
    result = await countriesCollection.deleteOne({ code: 'PT' })
    assert.deepStrictEqual(result.result.ok, 1)
    await client.close()
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports.description = 'add Portugal, Italy and Spain to the country collection'

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
require('dotenv').config()

module.exports.up = async function () {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = await client.db()
    const sourceCollection = await db.collection('providers')
    assert.notDeepStrictEqual(sourceCollection, null)
    const result = await sourceCollection.insertOne({
      code: 'PCM_DPC',
      name: 'PCM DPC IT',
      url: 'https://github.com/pcm-dpc/COVID-19',
      defaultPrecedence: 0,
      precedenceList: [{
        countryCode: 'IT',
        precedence: 900
      }]
    })
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
    const sourceCollection = await db.collection('providers')
    const result = await sourceCollection.deleteOne({ code: 'PCM_DPC' })
    assert.deepStrictEqual(result.result.ok, 1)
    await client.close()
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports.description = 'add a provider for data from Portuguese DGS'

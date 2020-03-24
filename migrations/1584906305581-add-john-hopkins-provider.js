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
      code: 'JOHN_HOPKINS',
      name: 'John Hopkins',
      url: 'https://github.com/CSSEGISandData/COVID-19',
      defaultPrecedence: 100,
      precedenceList: []
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
    const result = await sourceCollection.deleteOne({ code: 'JOHN_HOPKINS' })
    assert.deepStrictEqual(result.result.ok, 1)
    await client.close()
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports.description = 'add a provider for data from Johns Hopkins CSSE'

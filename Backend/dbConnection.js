const mongoDb = require("mongodb")

const mongoClient= mongoDb.MongoClient

 async function makeConnection()
 {
    const client = await mongoClient.connect("mongodb://localhost:27017")
    const db =  client.db("online_book_store")
    return db
 }

 module.exports = {
    connection: makeConnection
 }
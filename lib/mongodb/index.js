import { MongoClient } from 'mongodb'

const URI = process.env.MONGODB_URI
const options = { useUnifiedTopology: true, useNewUrlParser: true, }

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

let client = new MongoClient(URI, options)
let clientPromise

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect()
  }
  // console.log('dev clientPromise')
  clientPromise = global._mongoClientPromise
} else {
  // console.log('prod client promise')
  clientPromise = client.connect()
  // console.log('client connected')
}

export default clientPromise

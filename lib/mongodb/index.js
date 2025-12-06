import { MongoClient } from 'mongodb'

const URI = process.env.MONGODB_URI

if (!URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

let client = new MongoClient(URI)
let clientPromise

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise

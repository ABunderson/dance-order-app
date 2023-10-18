import clientPromise from "."

let client
let db
let orders

const ObjectId = require('mongodb').ObjectId

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db('danceProducts')
        orders = await db.collection('orders')
    } catch (error) {
        throw new Error("Failed to establish connection to database")
    }
}

;(async () => {
    await init()
})

export async function getOrders() {
    try {
        // console.log('in get styles')
        if (!orders) await init()
        const result = await styles
            .find({})
            // .limit()
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        // console.log(result)
        return {orders: result}
    } catch (error) {
        return { error: "Failed to fetch orders"}
    }
}

export async function addOrder() {
    const doc = {
        title: 'try to insert this',
        content: 'no harm in trying',
    }

    const result = await orders.insertOne(doc);
    console.log(`a document was inserted with the _id: ${result.insertedId}`)
}

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

export async function getOrders(limit) {
    try {
        if (!orders) await init()
        const result = await orders
            .find({})
            .limit(limit)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        // console.log(result)
        return {orders: result}
    } catch (error) {
        return { error: "Failed to fetch orders"}
    }
}

export async function getOrderById( orderId ) {
    try {
        if (!orders) await init()
        const result = await orders
            .find({  _id: ObjectId(orderId)})
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return {orders: result}
    } catch (error) {
        return { error: "Failed to fetch order"}
    }
}

export async function createOrder() {
    try {
        if (!orders) await init()
        const response = await db.orders.insertOne(
            {firstName: "aacde",
            lastName: 'death',})
        const data = await response.json()
        return(data)
    } catch (error) {
        return { error: "Failed to fetch order"}
    }
}

// let bodyObject = JSON.parse(req.body);
// let myOrder = await db.collection("orders").insertOne(bodyObject);
// res.json(myOrder.ops[0]);
// break;
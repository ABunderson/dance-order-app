import clientPromise from "."

let client
let db
let flowers

const ObjectId = require('mongodb').ObjectId

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db('danceProducts')
        flowers = await db.collection('flowers')
    } catch (error) {
        throw new Error("Failed to establish connection to database")
    }
}

;(async () => {
    await init()
})

export async function getFlowers(limit) {
    try {
        if (!flowers) await init()
        const result = await flowers
            .find({})
            .limit(limit)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return {flowers: result}
    } catch (error) {
        return { error: "Failed to fetch flowers"}
    }
}

export async function getFlower(flowerId) {
    try {
        if (!flowers) await init()
        const result = await flowers
            .find({ _id: ObjectId(flowerId) })
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return { flowers: result }
    } catch (error) {
        return { error: "Failed to fetch order" }
    }
}

export async function getFlowerByName( name ) {
    try {
        if (!flowers) await init()
        const result = await flowers
            .find({name: name})
            // .limit()
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return {flowers: result}
    } catch (error) {
        return { error: "Failed to fetch flowers"}
    }
}
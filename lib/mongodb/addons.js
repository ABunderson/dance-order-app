import clientPromise from "."

let client
let db
let addons

const ObjectId = require('mongodb').ObjectId

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db('danceProducts')
        addons = await db.collection('addons')
    } catch (error) {
        throw new Error("Failed to establish connection to database")
    }
}

;(async () => {
    await init()
})

export async function getAddons(limit) {
    try {
        if (!addons) await init()
        const result = await addons
            .find({})
            .limit(limit)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        // console.log(result)
        return {addons: result}
    } catch (error) {
        return { error: "Failed to fetch addons"}
    }
}

export async function getAddonsByType(type) {
        // send in the opposite of what you want
        const opType = type === 'corsage' ? 'boutonniere' : 'corsage'
    try {
        if (!addons) await init()
        const result = await addons
            .find({ for: { $ne: opType } })
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return {addons: result}
    } catch (error) {
        return { error: "Failed to fetch styles"}
    }
}
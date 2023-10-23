import clientPromise from "."

let client
let db
let supplies

const ObjectId = require('mongodb').ObjectId

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db('danceProducts')
        supplies = await db.collection('supplies')
    } catch (error) {
        throw new Error("Failed to establish connection to database")
    }
}

; (async () => {
    await init()
})

export async function getSupplies(limit) {
    try {
        if (!supplies) await init()
        const result = await supplies
            .find({})
            .limit(limit)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return { supplies: result }
    } catch (error) {
        return { error: "Failed to fetch supplies" }
    }
}

export async function getSupplyByName(name) {
    try {
        if (!supplies) await init()
        const result = await supplies
            .find({ name: name })
            // .limit()
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return { supplies: result }
    } catch (error) {
        return { error: "Failed to fetch supply" }
    }
}
export async function getSupplyByNameArray(nameArray) {
    if (nameArray.length === 1) {
        try {
            if (!supplies) await init()
            const result = await supplies
                .find({ $or: [{ name: nameArray[0] }] })
                // .limit()
                .map(user => ({ ...user, _id: user._id.toString() }))
                .toArray()
            return { supplies: result }
        } catch (error) {
            return { error: "Failed to fetch supply" }
        }
    }
    if (nameArray.length === 2) {
        try {
            if (!supplies) await init()
            const result = await supplies
                .find({ $or: [{ name: nameArray[0] }, {name: nameArray[1]}] })
                // .limit()
                .map(user => ({ ...user, _id: user._id.toString() }))
                .toArray()
            return { supplies: result }
        } catch (error) {
            return { error: "Failed to fetch supply" }
        }
    }
}
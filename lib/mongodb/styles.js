import clientPromise from "."

let client
let db
let styles

const ObjectId = require('mongodb').ObjectId

async function init() {
    // console.log('try to connect to database')
    if (db) return
    // console.log('about to try')
    // console.log(clientPromise)
    try {
        client = await clientPromise
        // console.log('client promise aquired')
        db = await client.db('danceProducts')
        styles = await db.collection('styles')
        // console.log('connected to the database')
    } catch (error) {
        throw new Error("Failed to establish connection to database")
    }
}

;(async () => {
    await init()
})

export async function getStyles() {
    try {
        // console.log('in get styles')
        if (!styles) await init()
        const result = await styles
            .find({})
            // .limit()
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        // console.log(result)
        return {styles: result}
    } catch (error) {
        return { error: "Failed to fetch styles"}
    }
}

export async function getStyle( styleId ) {
    try {
        if (!styles) await init()
        const result = await styles
            .find({  _id: ObjectId(styleId)})
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return {styles: result}
    } catch (error) {
        return { error: "Failed to fetch styles"}
    }
}

export async function getStylesByType(type) {
    try {
        if (!styles) await init()
        const result = await styles
            .find({type: type})
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return {styles: result}
    } catch (error) {
        return { error: "Failed to fetch styles"}
    }
}
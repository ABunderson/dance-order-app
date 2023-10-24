import clientPromise from "."

let client
let db
let styles

const ObjectId = require('mongodb').ObjectId

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db('danceProducts')
        styles = await db.collection('styles')
    } catch (error) {
        throw new Error("Failed to establish connection to database")
    }
}

;(async () => {
    await init()
})

export async function getStyles(limit) {
    try {
        if (!styles) await init()
        const result = await styles
            .find({})
            .limit(limit)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
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

export async function getStylesByDefault(limit) {
    try {
        if (!styles) await init()
        const result = await styles
            .find({defaultStyle: true})
            .limit(limit)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
            // console.log(result)
        return {styles: result}
    } catch (error) {
        return { error: "Failed to fetch styles"}
    }
}
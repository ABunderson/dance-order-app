import clientPromise from "."

let client
let db
let styles

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

export async function getStyles() {
    try {
        if (!styles) await init()
        const result = await styles
            .find({})
            .limit(20)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return {styles: result}
    } catch (error) {
        return { error: "Failed to fetch styles"}
    }
}
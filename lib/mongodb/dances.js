import clientPromise from "."

let client
let db
let dances

const ObjectId = require('mongodb').ObjectId

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db('danceProducts')
        dances = await db.collection('dances')
    } catch (error) {
        throw new Error("Failed to establish connection to database")
    }
}

;(async () => {
    await init()
})

export async function getDances(limit) {
    try {
        if (!dances) await init()
        const result = await dances
            .find({})
            .limit(limit)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        // console.log(result)
        return {dances: result}
    } catch (error) {
        return { error: "Failed to fetch dances"}
    }
}

// export async function getStyle( styleId ) {
//     try {
//         if (!styles) await init()
//         const result = await styles
//             .find({  _id: ObjectId(styleId)})
//             .map(user => ({ ...user, _id: user._id.toString() }))
//             .toArray()
//         return {styles: result}
//     } catch (error) {
//         return { error: "Failed to fetch styles"}
//     }
// }

// export async function getStylesByType(type) {
//     try {
//         if (!styles) await init()
//         const result = await styles
//             .find({type: type})
//             .map(user => ({ ...user, _id: user._id.toString() }))
//             .toArray()
//         return {styles: result}
//     } catch (error) {
//         return { error: "Failed to fetch styles"}
//     }
// }
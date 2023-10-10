import clientPromise from "."

let client
let db
let users

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db('danceProducts')
        users = await db.collection('users')
    } catch (error) {
        throw new Error("Failed to establish connection to database")
    }
}

;(async () => {
    await init()
})

export async function getUser(username, password) {
    try {
        // if (!users) await init()
        await init()
        const result = await users
            .find({username: username, password: password})
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        // console.log(result.length)
        // return result.length===1 ? true : false;
        return {users: result}

    } catch (error) {
        return { error: "Failed to fetch users"}
    }
}
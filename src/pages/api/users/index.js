import { getUsers } from "mongoDb/users"
import clientPromise from 'mongoDb/index'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("danceProducts")

    switch (req.method) {
      case "POST":
        const bodyObject = JSON.parse(req.body)
        const result = await db.collection("users").insertOne(bodyObject)

        // Return the inserted document with _id as string
        res.status(201).json({ ...bodyObject, _id: result.insertedId.toString() })
        break

      case "GET":
        try {
          const { users, error } = await getUsers(0)
          if (error) throw new Error(error)
          res.status(200).json({ users })
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
        break

      default:
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
        break
    }
  } catch (error) {
    console.error("API /users error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

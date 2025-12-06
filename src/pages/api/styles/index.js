import { getStyles } from "mongoDb/styles"
import clientPromise from '../../../../lib/mongodb/index'

async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("danceProducts")

    switch (req.method) {
      case "POST":
        const bodyObject = JSON.parse(req.body)
        const result = await db.collection("styles").insertOne(bodyObject)

        // Return the inserted document with _id as string
        res.status(201).json({ ...bodyObject, _id: result.insertedId.toString() })
        break

      case "GET":
        try {
          const { styles, error } = await getStyles(0)
          if (error) throw new Error(error)
          res.status(200).json({ styles })
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
    console.error("API /styles error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export default handler

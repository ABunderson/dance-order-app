import clientPromise from '../../../../lib/mongodb/index'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("danceProducts")

    switch (req.method) {
      case "POST":
        const bodyObject = JSON.parse(req.body)
        const result = await db.collection("orders").insertOne(bodyObject)

        // Return inserted document with _id as string
        res.status(201).json({ ...bodyObject, _id: result.insertedId.toString() })
        break

      case "GET":
        const allOrders = await db.collection("orders").find({}).toArray()

        // Convert _id to string for each order
        const formattedOrders = allOrders.map(order => ({ ...order, _id: order._id.toString() }))

        res.status(200).json({ data: formattedOrders })
        break

      default:
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
        break
    }
  } catch (error) {
    console.error("API /orders error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

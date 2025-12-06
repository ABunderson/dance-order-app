import { getDances } from "mongoDb/dances"
import clientPromise from '../../../../lib/mongodb/index'

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("danceProducts");
        const bodyObject = JSON.parse(req.body);

        // Insert dance
        const result = await db.collection("dances").insertOne(bodyObject);

        // Return the inserted document with _id as string
        res
          .status(201)
          .json({ ...bodyObject, _id: result.insertedId.toString() });
      } catch (error) {
        console.error("POST /api/dances error:", error);
        res.status(500).json({ error: "Failed to create dance" });
      }
      break;

    case "GET":
      try {
        const { dances, error } = await getDances(0);
        if (error) throw new Error(error);
        res.status(200).json({ dances });
      } catch (error) {
        console.error("GET /api/dances error:", error);
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

export default handler;

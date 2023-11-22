import { getDances } from "mongoDb/dances"
import clientPromise from '../../../../lib/mongodb/index'

async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const client = await clientPromise;
            const db = client.db("danceProducts");
            let bodyObject = JSON.parse(req.body);
            let myDance = await db.collection("dances").insertOne(bodyObject);
            res.json(myDance.ops[0]);
            break;
        case "GET":
            try {
                const { dances, error } = await getDances(0)
                if (error) throw new Error(error)
                return res.status(200).json({ dances })
            } catch (error){
                return res.status(500).json({ error: error.message })
            }
            break;
    }
}

export default handler
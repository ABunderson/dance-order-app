import { getStyles } from "mongoDb/styles"
import clientPromise from '../../../../lib/mongodb/index'

async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const client = await clientPromise;
            const db = client.db("danceProducts");
            let bodyObject = JSON.parse(req.body);
            let myStyle = await db.collection("styles").insertOne(bodyObject);
            res.json(myStyle.ops[0]);
            break;
        case "GET":
            try {
                const { styles, error } = await getStyles(0)
                if (error) throw new Error(error)
                return res.status(200).json({ styles })
            } catch (error){
                return res.status(500).json({ error: error.message })
            }

    }
}

export default handler
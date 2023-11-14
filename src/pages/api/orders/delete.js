import clientPromise from 'mongodb/index'

const ObjectId = require('mongodb').ObjectId

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("danceProducts");
    switch (req.method) {
        case "POST":
            let myOrder = await db.collection("orders").deleteMany({ specialInstructions: { $exists: false } });
            res.json(myOrder);
            break;
        case "GET":
            const thisOrder = await db.collection("orders").find().toArray();
            res.json({ status: 200, data: thisOrder });
            break;
    }
}
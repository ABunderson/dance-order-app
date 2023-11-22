import clientPromise from '../../../../../lib/mongodb/index'

const ObjectId = require('mongodb').ObjectId

export default async function handler(req, res) {
    const { styleId } = req.query
    const client = await clientPromise;
    const db = client.db("danceProducts");
    let filter = styleId
    switch (req.method) {
        case "POST":
            let myOrder = await db.collection("styles").deleteOne({ _id: ObjectId(filter)} );
            res.json(myOrder);
            break;
        case "GET":
            const thisOrder = await db.collection("styles").find({ _id: ObjectId(filter)}).toArray();
            res.json({ status: 200, data: thisOrder });
            break;
    }
}
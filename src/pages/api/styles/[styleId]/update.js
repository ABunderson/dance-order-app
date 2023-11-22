import clientPromise from 'mongodb/index'

const ObjectId = require('mongodb').ObjectId

export default async function handler(req, res) {
    const { styleId } = req.query
    const client = await clientPromise;
    const db = client.db("danceProducts");
    let filter = styleId
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let myOrder = await db.collection("styles").updateOne({ _id: ObjectId(filter)}, {$set:bodyObject} );
            res.json(myOrder);
            break;
        case "GET":
            const thisOrder = await db.collection("styles").find({ _id: ObjectId(filter)}).toArray();
            res.json({ status: 200, data: thisOrder });
            break;
    }
}
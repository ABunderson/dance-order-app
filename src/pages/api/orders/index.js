import clientPromise from '../../../../lib/mongodb/index'

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("danceProducts");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let myOrder = await db.collection("orders").insertOne(bodyObject);
            res.json(myOrder.ops[0]);
            break;
        case "GET":
            const allOrders = await db.collection("orders").find({}).toArray();
            res.json({ status: 200, data: allOrders });
            break;
    }
}
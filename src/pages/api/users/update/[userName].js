import clientPromise from 'mongodb/index'

export default async function handler(req, res) {
    const { userName } = req.query
    const client = await clientPromise;
    const db = client.db("danceProducts");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let myOrder = await db.collection("users").updateOne({ username: userName}, {$set:bodyObject} );
            res.json(myOrder);
            break;
        case "GET":
            const thisOrder = await db.collection("styles").find({ username: userName}).toArray();
            res.json({ status: 200, data: thisOrder });
            break;
    }
}
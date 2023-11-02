import { getUsers } from "mongoDb/users"
import clientPromise from 'mongoDb/index'

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("danceProducts");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let myOrder = await db.collection("users").insertOne(bodyObject);
            res.json(myOrder.ops[0]);
            break;
        case "GET":
            const { users, error } = await getUsers(0)
            if (error) throw new Error(error)
            return res.status(200).json({ users })
            break;
    }
}

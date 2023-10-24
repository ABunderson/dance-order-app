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

// const handler = async (req, res) => {
//     if (req.mthod === 'POST') {
//         const client = await clientPromise;
//         const db = client.db("danceProducts");
//         let bodyObject = JSON.parse(req.body);
//         bodyObject = {
//             name: 'try',
//             set: 'a value',
//         }
//         let myDance = await db.collection("dances").insertOne(bodyObject);
//         res.json(myDance.ops[0]);
//     } else if (req.method === 'GET') {
//         try {
//             const { dances, error } = await getDances(0)
//             if (error) throw new Error(error)
//             return res.status(200).json({ dances })
//         } catch (error){
//             return res.status(500).json({ error: error.message })
//         }
//     } 
    
//     res.setHeader('Allow', ['GET', 'POST'])
//     res.status(425).end(`Method ${req.method} is not allowed.`)
// }

export default handler
import { getSupplyByName} from "mongoDb/supplies"

const handler = async (req, res) => {
    const { supplyName } = req.query
    if (req.method === 'GET') {
        try {
            const { supplies, error } = await getSupplyByName( supplyName )
            if (error) throw new Error(error)
            return res.status(200).json({ supplies })
        } catch (error){
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
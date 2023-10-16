import { getFlowers } from "mongoDb/flowers"

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { flowers, error } = await getFlowers()
            if (error) throw new Error(error)
            return res.status(200).json({ flowers })
        } catch (error){
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
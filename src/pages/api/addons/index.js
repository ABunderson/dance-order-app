import { getAddons } from "mongoDb/addons"

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { addons, error } = await getAddons(0)
            if (error) throw new Error(error)
            return res.status(200).json({ addons })
        } catch (error){
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
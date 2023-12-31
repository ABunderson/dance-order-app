import { getStylesByDefault } from "mongoDb/styles"

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { styles, error } = await getStylesByDefault(0)
            if (error) throw new Error(error)
            return res.status(200).json({ styles })
        } catch (error){
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
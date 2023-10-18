import { getAddonsByType } from "mongoDb/addons"


const handler = async (req, res) => {
    const { type } = req.query
    // console.log(styleId)

    if (req.method === 'GET') {
        try {
            const { addons, error } = await getAddonsByType(type)
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
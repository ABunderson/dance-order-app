import { getStylesByType } from "mongoDb/styles"

const handler = async (req, res) => {
    const { styleType } = req.query
    // const comment = comments.find((comment) => comment.id === parseInt(commentId))
    if (req.method === 'GET') {
        try {
            const { styles, error } = await getStylesByType(styleType)
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
import { getStylesByType } from "mongoDb/styles"

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { styleType } = req.query
      if (!styleType) {
        return res.status(400).json({ error: "Missing styleType query parameter" })
      }

      const { styles, error } = await getStylesByType(styleType)
      if (error) throw new Error(error)

      return res.status(200).json({ styles })
    } catch (error) {
      console.error("API /styles/byType error:", error)
      return res.status(500).json({ error: error.message })
    }
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).end(`Method ${req.method} is not allowed.`)
}

export default handler

import { getOrderById } from "mongoDb/orders"


const handler = async (req, res) => {
    const { orderId } = req.query
    // console.log(styleId)

    if (req.method === 'GET') {
        try {
            const { orders, error } = await getOrderById(orderId)
            if (error) throw new Error(error)
            return res.status(200).json({ orders })
        } catch (error){
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
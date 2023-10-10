import { getUser } from "mongoDb/users"

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            // const { users, error } = await getUser('Tina', '141bfcc78eb25468076d2f03a95e6e750176354f6ec9a974b49d7ce4cc82d35c9e681046f75e0f69eb006410fc240a6b15588a73a922d314411cea37ab97febb')
            const { users, error } = await getUser()
            if (error) throw new Error(error)
            return res.status(200).json({ users })
        } catch (error){
            return res.status(500).json({ error: error.message })
        }
    }

    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler
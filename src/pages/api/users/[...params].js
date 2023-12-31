import { getUser, getUserByName } from "mongoDb/users"

const handler = async (req, res) => {
    const params = req.query.params
    // console.log(params)
    if (req.method === 'GET') {
        if (params.length === 1){
            try {
                const { users, error } = await getUserByName(params[0])
                if (error) throw new Error(error)
                return res.status(200).json({ users })
            } catch (error){
                return res.status(500).json({ error: error.message })
            }

        } else if (params.length === 2)
        try {
            const { users, error } = await getUser(params[0], params[1])
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
import fs from 'fs'

async function handler(req, res) {

    if (req.method === 'POST') {
   
        const obj = JSON.parse(req.body)

        try {
            if (!fs.existsSync(obj.url)) {
                fs.mkdirSync(obj.url, { recursive: true })
                return res.status(201).json({ status: true, 'result': 'Successfully added folder' });
            } else {
                return res.status(201).json({ status: true, 'result': 'Folder Already exists'})
            }
        } catch (error) {
            console.log("didn't work: " + error)
        }

    }
    res.setHeader('Allow', ['POST'])
    res.status(425).end(`Method ${req.method} is not allowed.`)
}

export default handler


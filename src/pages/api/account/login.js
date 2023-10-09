const handler = async (req, res) => {
  console.log("in the api")
    // const data = req.body
    // const userName= await createItem(data)
    res.status(200).json({ word: 'something' })
}


export default handler
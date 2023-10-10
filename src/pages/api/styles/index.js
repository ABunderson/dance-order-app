import { getStyles } from "mongoDb/styles"

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { styles, error } = await getStyles()
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


// how to handle a post request
// temporarily stored

// if (req.method === 'GET'){
//     normal in above
// } else if (req.method === 'POST') {
//     const comment = req.body.comment
//     const newComment = {
//         id: Date.now(),
//         text: comment
//     }
//     CommentsPage.push(newComment)
//     res.status(201).json(newComment)
// } else if (req.methos === 'DELETE') {
//     const deletedComment = comments.find(
//         (comment) => comment.id === parseInt(commentId)
//     )
//     comments.splice(index, 1)

//     res.status(200).json(deletedComment)
// }
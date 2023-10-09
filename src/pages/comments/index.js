import { useState } from 'react'


function CommentsPage() {

    const [comments, setComments] = useState([])

    const [comment, setComment] = useState('')

    const fetchComments = async () => {
        const response = await fetch('/api/styles')
        const data = await response.json()
        setComments(data.styles)

    }

    const submitComment = async () => {
        const response = await fetch('/api/styles', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        console.log(data)
    }

    const deleteComment = async commentId => {
        const response = await fetch('/api/comments/${commentId', {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
        fetchComments()
    }

    return (
        <>
            <input type='text' value={comment} onChange={e => setComment(e.target.value)} />
            <button onClick={submitComment}>Submit Comment</button>
            <button onClick={fetchComments}> Load Styles</button>
            {
                comments.map(comment => {
                    console.log(comment)
                    return (
                        <div key={comment.id}>
                            {comment._id} {comment.name}
                            <button onClick={() => deleteComment(comment._id)}>Delete</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default CommentsPage
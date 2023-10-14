// // import array

// function Comment({ comment }) {
//     return (
//         <div>
//             {comment._id}. {comment.name}
//         </div>
//     )
// }
function Comment() {
    return (
        <div>
            not a real page
        </div>
    )
}

export default Comment

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: {commentId: '1'}},
//             { params: {commentId: '2'}},
//             { params: {commentId: '3'}}
//         ],
//         fallback: false,
//     }
// }

// export async function getStaticProps(context) {
//     const { params } = context
//     const { commentId } = params
//     const comment = comments.find((comment) => comment.id === parseInt(commentId))
//     console.log(comment)

//     return {
//         props: {
//             comment,
//         },
//     }
// }
import { useRouter } from 'next/router'


export default function Styles({ post }) {
    // returns a specific style based on the id

    // only use below if you want to use fallback: true,

    // const router = useRouter()
    // // const styleId = router.query.productId
    // if(router.isFallback){
    //     return <h1>The style is loading</h1>
    // }

    return (
        <>
            <h2>
                {post.id} {post.title}
            </h2>
            <p>{post.body}</p>
        </>
    )

}

export async function getStaticPaths() {
    const response = await fetch(`api end point all styles`)
    const data = await response.json()
    const paths = data.map(post => {
        return {
            params: {
                postId: `${post.id}`
            }
        }
    })
    return {
    //     paths: [
    //         {
    //             params: { postId: '1'},
    //         },
    //         {
    //             params: { postId: '2'},
    //         },
    //         {
    //             params: { postId: '3'},
    //         },
    //     ],
        paths,
        fallback: true,
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`api end point${params.postId}`)
    const data = await response.json()

    if(!data.id) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post: data,
        },
    }
}
'use client'

import styled from 'styled-components'
import { useRouter } from 'next/router';

const StyledDiv = styled.div`
text-transform: capitalize;
cursor: pointer;
font-size: 1rem;
`

const Breadcrumbs = ({ path }) => {
    const router = useRouter()

    // get rid of accidental duplicates caused by navigating with the path
    path.map((item, index) => {

        if (item.order === index) {

            path = path.splice(index, 1)
        }
    })

    const createCrumb = (item) => {
        const path = item.path
        const pathString = getPaths(item.order)
        return <span key={item.locName} onClick={() => { navigate(pathString, path) }}>{`${item.locName} > `}</span>
    }

    const navigate = (pathString, path) => {
        router.push({
            query: {
                paths: pathString
            },
            pathname: path,
        }, path)
    }

    const getPaths = (number) => {
        let output = JSON.parse(JSON.stringify(path))
        for (let i = output.length; i >= number; i--) {
            output.pop()
        }
        output = JSON.stringify(output)
        return output
    }

    return (
        <>
            <StyledDiv>
                {
                    path?.map((item, index) => {
                        return createCrumb(item, index)
                    })
                }
            </StyledDiv>
        </>
    )
}

export default Breadcrumbs
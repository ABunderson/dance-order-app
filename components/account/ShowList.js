import Link from "next/link"
import {SmallButton} from 'components/Button'
import styled from "styled-components"

const CrudDiv = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`

const ShowList = ({ objects, type }) => {

    // objects.map((item) => {
    //     console.log(item.name)
    //     console.log(item._id)
    // })

    return (
        <>
            {
                objects.map((item) => {
                    // console.log(item.name)
                    // console.log(item._id)
                    return (
                        <CrudDiv>
                            <Link key={item._id} href={`/account/${type}/${item._id}`}>
                                <p style={{ textTransform: 'capitalize', }} >{item.name} {item.type ? item.type : ''}</p>
                            </Link>
                            <SmallButton text='Update'></SmallButton>
                        </CrudDiv>
                    )
                })
            }
        </>
    )
}

export default ShowList
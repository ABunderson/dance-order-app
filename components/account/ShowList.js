import Link from "next/link"
import { SmallButton } from 'components/Button'
import styled from "styled-components"
import { useRouter } from "next/router"
import { FlexButton } from 'components/styles/ButtonStyles'
import {SmallLine} from 'components/Line'
import { Fragment } from "react"


const CrudDiv = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: end;
p {
    font-size: 1.3rem;
}

`

const ShowList = ({ objects, type }) => {
    const router = useRouter()

    return (
        <>
            {
                objects.map((item) => {
                    // console.log(item.name)
                    // console.log(item._id)
                    return (
                        <Fragment key={item._id}>
                        <SmallLine></SmallLine>
                        <CrudDiv>
                            <Link href={`/account/${type}/${item._id}`}>
                                <p style={{ textTransform: 'capitalize', }} >{item.name} {item.type ? item.type : ''}</p>
                            </Link>
                            <FlexButton>
                                <SmallButton text='Edit' type='button' action={() => { router.push(`/account/${type}/${item._id}/edit`) }}></SmallButton>
                                <SmallButton text='Delete' type='button' action={() => { router.push(`/account/${type}/${item._id}/delete`) }}></SmallButton>
                            </FlexButton>
                            
                        </CrudDiv>
                        
                        </Fragment>
                    )
                })
            }
        </>
    )
}

export default ShowList
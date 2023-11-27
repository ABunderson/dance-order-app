import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { SmallButton } from 'components/Button'
import { SmallLine } from 'components/Line'

import styled from 'styled-components'
import { FlexButton } from 'components/styles/ButtonStyles'
import { ItemList } from 'components/styles/BasicFlex'

import { setDate } from 'functions/orders'

const CrudDiv = styled(ItemList)`
    align-items: flex-start;
`

const ShowOrders = ({ objects, place, printAction }) => {
    const router = useRouter()

    return (
        <>
            {objects.map((item, index) => {
                return (
                    <Fragment key={item._id}>

                        {place === 'main' ? <SmallLine></SmallLine> : index === 0 ? <></> : <SmallLine></SmallLine>}

                        <CrudDiv>

                            <Link href={`/account/orders/${item._id}`} style={{ textTransform: 'capitalize' }}>
                                <p>Name: {item.firstName} {item.lastName}</p>
                                <p>Dance Date: {setDate(item.danceDate)}</p>
                                <p>Order Date: {setDate(item.orderDate)}</p>
                                <p>Status: {item.finishType === 'print' ? 'printed' : 'not printed'}</p>
                            </Link>

                            <FlexButton>
                                <SmallButton text='Print' type='button' action={() => { printAction(item) }}></SmallButton>
                                <SmallButton text='Delete' type='button' action={() => { router.push(`/account/orders/${item._id}/delete`) }}></SmallButton>
                            </FlexButton>

                        </CrudDiv>

                    </Fragment>
                )
            })}
        </>
    )
}

export default ShowOrders
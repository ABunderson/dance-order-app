import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment } from "react"

import { SmallButton } from 'components/Button'
import { SmallLine } from 'components/Line'

import { FlexButton } from 'components/styles/ButtonStyles'
import { ItemList } from 'components/styles/BasicFlex'



const ShowList = ({ objects, type, place }) => {
    const router = useRouter()

    return (
        <>
            {objects.map((item, index) => {

                return (
                    <Fragment key={item._id}>

                        {place === 'main' ? <SmallLine></SmallLine> : index === 0 ? <></> : <SmallLine></SmallLine>}

                        <ItemList>

                            <Link href={`/account/${type}/${item._id}`}>
                                <p style={{ textTransform: 'capitalize', }} >{item.name} {item.type ? item.type : ''}</p>
                            </Link>

                            <FlexButton>
                                <SmallButton text='Edit' type='button' action={() => { router.push(`/account/${type}/${item._id}/edit`) }}></SmallButton>
                                <SmallButton text='Delete' type='button' action={() => { router.push(`/account/${type}/${item._id}/delete`) }}></SmallButton>
                            </FlexButton>

                        </ItemList>

                    </Fragment>
                )
            })}
        </>
    )
}

export default ShowList
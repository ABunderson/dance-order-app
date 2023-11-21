import Image from "next/image"
import styled from 'styled-components'
import { SmallLine } from 'components/Line'

const FlexDiv = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;

    div:first-child {
        flex-basis: 50%;
    }

    div {
        padding-bottom: 15px;
    }

    @media (max-width: 850px) {
        display: block;
    }

    img {
        max-width: 100%;
        width: 500px;
        height: auto;
    }
`

const FlexInfo = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
`




const StyleView = ({ style, supplies }) => {

    style.flower = (style.flower === 'fullRose' ? 'full sized rose' : style.flower)

    let supplyNames = ''

    {
        supplies?.map((supply, index) => {
            index === supplies.length - 1 ? supplyNames += supply.name : supplyNames += `${supply.name}, `
        })
    }

    return (
        <>
            <h2 className="capitalize">Name: {style.name} {style.type}</h2>
            <SmallLine></SmallLine>

            <FlexDiv>

                <FlexInfo className='capitalize'>

                    <h3>Type: {style.type}</h3>
                    <SmallLine></SmallLine>

                    <h3>Main Flower: {style.flower}</h3>
                    <SmallLine></SmallLine>

                    <h3>Price: ${style.price}</h3>
                    <SmallLine></SmallLine>

                    <h3>Description</h3>
                    <p style={{ textTransform: 'none' }}>{style.description}</p>
                    <SmallLine></SmallLine>

                    {supplies.length >= 1 ? <><h3>Supplies</h3><p>{supplyNames}</p></> : <></>}
                    <SmallLine></SmallLine>

                    <h3>Default Style: {style.defaultStyle === true ? 'Yes' : 'No'}</h3>
                    <SmallLine></SmallLine>

                    <h3>Page Border Color: {style.pageColor}</h3>
                                       

                </FlexInfo>

                <FlexInfo >
                    <Image
                        src={style.image}
                        alt={`A ${style.name} ${style.type}`}
                        title={`A ${style.name} ${style.type}`}
                        width={500}
                        height={500}
                        priority
                        onError={(e) => {
                            if (e.target.src.includes('no-image')) {
                                e.target.onError = null
                            } else {
                                style.image = '/no-image.jpg'
                                e.target.alt = 'A placeholder image'
                                e.target.srcset = ''
                                e.target.src = '/no-image.jpg'
                            }
                        }}
                    />
                </FlexInfo >

            </FlexDiv>

        </>
    )
}

export default StyleView
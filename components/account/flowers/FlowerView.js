import Image from "next/image"
import styled from 'styled-components'
import { SmallLine } from 'components/Line'
import { Fragment } from "react"

const FlexRow = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;

    img {
        max-width: 200px;
        width: 100%;
    }

    div {
        padding-bottom: 15px;
    }

    @media (max-width: 600px) {
        display: block;

        h4 {
            padding-bottom: 10px;
        }
    }

`

const FlexInfo = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
`




const FlowerView = ({ flower }) => {

    return (
        <>
            <h2 className="capitalize">Name: {flower.name}</h2>
            <SmallLine></SmallLine>


            <FlexInfo>
                <h3>Description: </h3>
                <p>{flower.description}</p>
            </FlexInfo>
            <SmallLine></SmallLine>

            <h3>Colors:</h3>
            {flower.colors.map((color) => {
                return (
                    <Fragment key={color.colorName}>
                        <SmallLine></SmallLine>

                        <FlexRow >

                            <h4>Color: {color.colorName}</h4>
                            <h4>Default: {color.defaultColor === true ? 'Yes' : 'No'}</h4>
                            <Image
                                src={color.colorImage}
                                alt={`${color.colorName} ${flower.name}`}
                                title={`${color.colorName} ${flower.name}`}
                                width={200}
                                height={200}
                                priority
                                onError={(e) => {
                                    if (e.target.src.includes('no-image')) {
                                        e.target.onError = null
                                    } else {
                                        color.colorImage = '/no-image.jpg'
                                        e.target.alt = 'A placeholder image'
                                        e.target.srcset = ''
                                        e.target.src = '/no-image.jpg'
                                    }
                                }}
                            />
                        </FlexRow>
                    </Fragment>
                )
            })}

        </>
    )
}

export default FlowerView
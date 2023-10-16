import Image from "next/image"
import styled from 'styled-components'
import { LargeButton } from 'components/Button'

const FlexDiv = styled.div`
    display: flex;
    gap: 20px;

    > * {
        // background-color: red;
    }

    div:first-child {
        flex-basis: 85%;
        // background-color: blue;
        padding-bottom: 15px;
    }

    @media (max-width: 850px) {
        display: block;
    }

    img {
        max-width: 500px;
        width: 100%;
        height: auto;
    }
`

const FlexInfo = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
`

const FlexButton = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;

    @media (max-width: 670px){
        flex-direction: column;
        gap: 2rem;
        padding-bottom: 1rem;
    }

`


const StyleInfo = ({ style, backAction, forwardAction }) => {
    // console.log(style.flower)

    style.flower = (style.flower === 'fullRose' ? 'full sized rose': style.flower)

    return (
        <>
            <h1 style={{ textTransform: 'capitalize', paddingBottom: '15px' }}>{style.name} {style.type}</h1>

            <FlexDiv>

                <div>
                    <Image
                        src={style.image}
                        alt={`A ${style.name} ${style.type}`}
                        title={`A ${style.name} ${style.type}`}
                        width={500}
                        height={500}
                        priority
                    />
                </div>

                <FlexInfo>
                    <h3>Price: ${style.price}</h3>
                    <h3 style={{ textTransform: 'capitalize'}}>Main Flower: {style.flower}</h3>
                    <h3>Description</h3>
                    <p>{style.description}</p>
                </FlexInfo>

            </FlexDiv>

            <FlexButton>
                <LargeButton text='Back' type='button' action={backAction}></LargeButton>
                <LargeButton text='Pick this Style'type='button' action={forwardAction}></LargeButton>
            </FlexButton>
        </>
    )
}

export default StyleInfo
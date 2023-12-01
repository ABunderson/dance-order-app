import Image from 'next/image'
import styled from 'styled-components'
import Button from 'components/Button'

import { FlexButton } from 'components/styles/ButtonStyles'
import { FlexInfo } from 'components/styles/BasicFlex'

const StyleFlexDiv = styled.div`
    display: flex;
    gap: 20px;

    div:first-child {
        flex-basis: 85%;
        padding-bottom: 15px;
    }

    @media (max-width: 850px) {
        display: block;
    }
`

const StyleInfo = ({ style, backAction, forwardAction }) => {

    style.flower = (style.flower === 'fullRose' ? 'full sized rose': style.flower)

    return (
        <>
            <h1 style={{ textTransform: 'capitalize', paddingBottom: '15px' }}>{style.name} {style.type}</h1>

            <StyleFlexDiv>

                <div>
                    <Image
                        src={style.image}
                        alt={`A ${style.name} ${style.type}`}
                        title={`A ${style.name} ${style.type}`}
                        width={500}
                        height={500}
                        priority
                        style={{ height:'auto', width: '100%', maxWidth: '500px'}}
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
                </div>

                <FlexInfo>
                    <h3>Price: ${style.price}</h3>
                    <h3 style={{ textTransform: 'capitalize'}}>Main Flower: {style.flower}</h3>
                    <h3>Description</h3>
                    <p>{style.description}</p>
                </FlexInfo>

            </StyleFlexDiv>

            <FlexButton>
                <Button text='Back' type='button' action={backAction}></Button>
                <Button text='Pick this Style'type='button' action={forwardAction}></Button>
            </FlexButton>
        </>
    )
}

export default StyleInfo
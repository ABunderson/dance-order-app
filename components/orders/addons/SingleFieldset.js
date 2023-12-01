import Image from 'next/image'
import styled from 'styled-components'

import { StyledFieldset } from 'components/styles/FieldsetStyles'
import { BasicFlex } from 'components/styles/BasicFlex'

const FlexDiv = styled(BasicFlex)`
    font-size: 1em;
`

const SingleFieldset = ({ item, keyValue }) => {

    let name = item.name
    name = name.split(' ').join('')

    let price = item.price
    let sign = '$'

    if (item.price < 1) {
        price = item.price * 100
        sign = '￠'
    }

    return (
        <StyledFieldset>
            <legend>{item.name} {item.name === 'slap' || item.name === 'pearl' ? 'bracelet' : ''}</legend>
            <p>{item.description}</p>
            <p>{sign === '$' ? `${sign}${price}` : `${price}${sign} `}{item.limit ? '' : ' each'}</p>

            <FlexDiv key={keyValue + 'div'}>

                <div key={item.name}>
                    <input type='checkbox' name={name} id={name} value={item.name} />
                    <label htmlFor={name}>
                        <span>{item.name}</span>

                        <Image
                            src={item.mainImage}
                            alt={`${item.name}`}
                            title={`Click to add ${item.name}`}
                            width={250}
                            height={250}
                            priority
                            onError={(e) => {
                                if (e.target.src.includes('no-image')) {
                                    e.target.onError = null
                                } else {
                                    item.mainImage = '/no-image.jpg'
                                    e.target.alt = 'A placeholder image'
                                    e.target.srcset = ''
                                    e.target.src = '/no-image.jpg'
                                }
                            }}
                        />

                    </label>
                </div>
            </FlexDiv>

        </StyledFieldset >
    )
}

export default SingleFieldset
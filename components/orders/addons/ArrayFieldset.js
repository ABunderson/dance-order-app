import Image from 'next/image'

import { StyledFieldset } from 'components/styles/FieldsetStyles'
import { FieldsetGridDiv } from 'components/styles/Grid'

const ArrayFieldset = ({ item, keyValue }) => {

    let name = item.name
    name = name.split(' ').join('')
    const radioGroup = name + 'Color'
    let price = item.price
    let sign = '$'

    if (item.price < 1) {
        price = item.price * 100
        sign = '￠'
    }

    return (
        // <p key={keyName}>ribbon</p>)
        <StyledFieldset>
            <legend>{item.name} {item.name === 'slap' || item.name === 'pearl' ? 'bracelet' : ''}</legend>
            <p>{item.description}</p>
            <p>{sign === '$' ? `${sign}${price}` : `${price}${sign} `}{item.limit ? '' : ' each'}</p>
            <FieldsetGridDiv key={keyValue + 'div'}>
                {item.colors.map((color) => {
                    return (
                        <div key={color.colorName + item.name}>

                            <input type='checkbox' name={radioGroup} id={name + color.colorName} value={color.colorName} />

                            <label htmlFor={name + color.colorName}>
                                <span>{color.colorName}</span>

                                <Image
                                    src={color.colorImage}
                                    alt={`${color.colorName} ${item.name}`}
                                    title={`Click to select ${color.colorName} ${item.name}`}
                                    width={250}
                                    height={250}
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

                            </label>

                        </div>
                    )
                })}

            </FieldsetGridDiv>

            {!item.limit ? (
                <div key={keyValue + 'LimitDiv'}>
                    <label htmlFor={name + 'Quantity'} className='ribbonLabel'>Amount: </label>
                    <input name={name + 'Quantity'} id={name + 'Quantity'} type='number' defaultValue='0' min='0' />
                </div>
            ) : (
                <></>
            )}
        </StyledFieldset>
    )
}

export default ArrayFieldset
import Image from "next/image"
import styled from "styled-components"
import { StyledFieldset } from "components/styles/FieldsetStyles"

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-around;
    gap: 15px;

    @media (max-width: 650px) {
        div {
            width: 100%;
        }
    }
`


const ArrayFieldset = ({ item, keyValue }) => {
    // console.log(keyValue)
    // console.log(item)

    let name = item.name
    name = name.split(" ").join('')
    const radioGroup = name + 'Color'
    let price = item.price
    let sign = '$'

    if (item.price < 1) {
        price = item.price * 100
        sign = '￠'
    }
    // console.log(keyValue)

    return (
        // <p key={keyName}>ribbon</p>)
        <StyledFieldset>
            <legend>{item.name} {item.name === 'slap' || item.name === 'pearl' ? 'bracelet' : ''}</legend>
            <p>{item.description}</p>
            <p>{sign === '$' ? `${sign}${price}` : `${price}${sign} `}{item.limit ? '' : ' each'}</p>
            <FlexDiv key={keyValue + 'div'}>
                {item.colors.map((color) => {
                    // console.log(color.colorName+item.name)
                    return <div key={color.colorName + item.name}>
                        
                        <input type='checkbox' name={radioGroup} id={name + color.colorName} value={color.colorName} />
                        <label htmlFor={name + color.colorName}>
                            <p>{color.colorName}</p>
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
                })}


            </FlexDiv>

            {!item.limit ? (
                <div key={keyValue + 'LimitDiv'}>
                    <label htmlFor={name + 'Quantity'} className="ribbonLabel">Amount: </label>
                    <input name={name + 'Quantity'} type="number" defaultValue='0' min="0" />
                </div>
            ) : (
                <></>
            )}
        </StyledFieldset>
    )
}

export default ArrayFieldset
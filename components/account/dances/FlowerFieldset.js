import Image from "next/image"
import styled from "styled-components"

import { StyledFieldset } from "components/styles/FieldsetStyles"

const FlexDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8em, 12em));
    justify-content: space-around;
    gap: 10px;
    row-gap: 30px;

    @media (max-width: 650px) {
        p {
            text-align: center;
        }
        div {
            width: 100%;
            
        }
    }
`
const Fieldset = styled(StyledFieldset)`
    label {
        flex: 1 0 50%;
        height: 100%;
        img, p {
            text-align: center;
            max-width: 250px;
            width: 100%;
        }
    }
    @media (max-width: 650px) {
        label {
            img {
                max-width: 100%;
            }
        }
    }
`

const FlowerFieldset = ({ flower, dance }) => {

    const getDefualtColor = (color) => {
        if (dance) {
            let colorArray = []
            colorArray = dance.flowers.find(item => item.flowerName === flower.name)
            return colorArray.colors.includes(color.colorName)
        } else {
            return color.defaultColor
        }
    }

    return (
        <Fieldset key={flower.name + 'Fieldset'}>
            <legend>{flower.name}</legend>
            <p>Pick the colors you want to be able to sell for the dance. {dance ? 'Prior selections for this dance start green' : 'Green boxes mean they are selected.'}</p>
            <FlexDiv>
                {
                    flower.colors.map((color) => {

                        return (
                            <div key={color.colorName + flower.name}>
                                <input type='checkbox' name={flower.name.split(' ').join('')} id={flower.name + color.colorName} value={color.colorName} defaultChecked={getDefualtColor(color)} className={flower.name.split(' ').join('')} />
                                <label htmlFor={flower.name + color.colorName}>
                                    <p>{color.colorName}</p>
                                    <Image
                                        src={color.colorImage}
                                        alt={`${color.colorName} ${flower.name}`}
                                        title={`Click to select ${color.colorName} ${flower.name}`}
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
                    })
                }

            </FlexDiv>
        </Fieldset >
    )
}

export default FlowerFieldset
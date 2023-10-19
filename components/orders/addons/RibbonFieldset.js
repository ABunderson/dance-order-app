import Image from "next/image"
import styled from "styled-components"
import { StyledFieldset } from "components/styles/FieldsetStyles"

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-around;
    gap: 15px;

    .colorDiv {
        background-color: peach;
        height: 50px;
        width: 50px;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid black;
    }

    @media (max-width: 200px) {
        div {
            width: 100%;
        }
    }
`


const RibbonFieldset = ({ item, ribbon, keyValue }) => {
    // console.log(keyValue)

    // console.log(ribbon[0].colors)
    let name = item.name
    name = name.split(" ").join('')
    const radioGroup = name + 'Ribbon'
    // console.log(radioGroup)
    ribbon = ribbon[0]
    let price = item.price
    let sign = '$'

    if (item.price < 1) {
        price = item.price * 100
        sign = '￠'
        console.log(item.price * 100)
    }

    return (
        // <p key={keyName}>ribbon</p>)
        <StyledFieldset>
            <legend>{item.name}</legend>
            <p>{item.description}</p>
            <p>{sign === '$' ? `${sign}${price}`: `${price}${sign} `}{item.limit ? '':' each'}</p>
            <FlexDiv key={keyValue + 'div'}>
                {ribbon.colors[0].map((color) => {
                    let keyName = color + item.name;
                    keyName = keyName.split(" ").join('')
                    return (
                        <div key={keyName}>
                            <input type='radio' name={radioGroup} id={color} value={color} />
                            <label htmlFor={color} className="ribbonColors">
                                <p>{color}</p>
                                <section className="colorDiv" style={{ background: `${color === "peach" ? "peachpuff" : color.split(" ").join('')}` }}>

                                </section>
                            </label>
                        </div>
                        )
                })}
            </FlexDiv>
            <label htmlFor='extraRibbonColor' className="ribbonLabel">Ribbon Color: </label>
            <input name='extraRibbonColor' type="text"/>
         </StyledFieldset >
     )
}

export default RibbonFieldset
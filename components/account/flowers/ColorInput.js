import styled from "styled-components"
import { useRouter } from "next/router"
import Image from "next/image"
import React from 'react'

import { SmallLine } from 'components/Line'
import Button, { SmallButton } from 'components/Button'

const FlexDiv = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    align-items: center;
    display: flex;
    gap: 15px;
    width: 100%;

    > p {
        max-width: 150px;
    } 

    @media (max-width: 650px) {
        > p {
            max-width: 100%;
        }
        flex-wrap: wrap;
    }
    
    input[type='radio'], input[type='checkbox'] {
        display: none;
    }

    input[type='radio']:checked+label{
        background-color: var(--main-green);
    }

    input[type='checkbox']:checked+label{
        background-color: var(--main-green);
    }

label {
    flex-grow: 2;
    display: block;
    border: 1px solid black;
    border-radius: 15px;
    height: auto;
    padding: 1rem;
    width: auto;

    p {
        text-align: center;
        text-transform: capitalize;
    }

}
`

const FormStyling = styled.div`
display: flex;
flex-wrap: wrap; 
row-gap: 15px;
font-size: 1.2em;
align-items: center;
max-width: 500px;

& input, select, textarea {
    font-size: .75em;
    padding: 5px;
    background-color: gainsboro;
    flex-basis: 60%;
    width: 100%;
}

& button {
    margin-top: 10px;
    flex-basis: 92%;
}

& label {
    flex-basis: 35%;
}

@media (max-width: 450px) {
    max-width: 100%;
    width: 100%;

    & input, select, textarea {
        flex-basis: 100%;
        width: 100%;
        max-width: 300px;
    }

    & label {
        flex-basis: 100%;
    }

    & button {
        flex-basis: 100%;
        margin-top: 20px;
    }
}  

& span {
    width: 100%;  
    font-size: 1rem;
}  

p {
    width: 100%;
}
`

const ColorInput = ({ image, position, removeColor, handleChange }) => {

    image ? image = `${image}?t=` + new Date().getTime() : image = `/no-image.jpg?t=` + new Date().getTime()

    return ( 
        <FormStyling>
            <SmallLine></SmallLine>
            <h4>Color {position + 1}</h4>
            <SmallLine></SmallLine>

            <label htmlFor={`colorName-${position}`}>Color: </label>
            <input type='text' name={`colorName-${position}`} id={`colorName-${position}`} placeholder="Red" required />
            {/* defaultValue={flower ? flower.name : ''}  */}

            <FlexDiv>

                <p>Default Style: </p>
                <input type='radio' name={`defaultColor-${position}`} id={`true-${position}`} value={true} />
                <label htmlFor={`true-${position}`}>
                    <p>Yes</p>
                </label>

                <input type='radio' name={`defaultColor-${position}`} id={`false-${position}`} value={false} />
                {/* defaultChecked={flower ? !flower.defaultStyle ? true : false : ''} */}
                <label htmlFor={`false-${position}`}>
                    <p>No</p>
                </label>
            </FlexDiv>

            <label htmlFor={`image-${position}`}>Image: </label>
            <input type='file' name={`image-${position}`} id={`image-${position}`} placeholder="pink-rose.jpg" onChange={handleChange} />
            <span>Please use a .jpg or .jpeg image. Square pictures are preferred.</span>

            <Image
                src={image}
                alt={`the uploaded image`}
                title={`Image preview`}
                width={200}
                height={200}
                onError={(e) => {
                    if (e.target.src.includes('no-image')) {
                        e.target.onError = null
                    } else {
                        image = '/no-image.jpg'
                        e.target.alt = 'A placeholder image'
                        e.target.srcset = ''
                        e.target.src = '/no-image.jpg'
                    }
                }}
            />

            {position === 0 ? '' : <SmallButton text={`Remove Color ${position + 1}`} type='button' action={() => {removeColor(position)}}></SmallButton>}
            <SmallLine></SmallLine>
        </FormStyling>)
    
}

export default ColorInput
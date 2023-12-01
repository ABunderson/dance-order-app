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

    span {
        display: block;
        text-align: center;
        font-size: 1.4rem !important;
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

const ColorInput = ({ file, position, removeColor, handleChange, number }) => {

    file ? file === '/no-image.jpg' ? file : file = `${file}?t=` + new Date().getTime() : file = `/no-image.jpg`

    return ( 
        <FormStyling key={position ? 'colorArea' + position : 'colorArea'}> 
            <SmallLine></SmallLine>
            <h4>Color {number}</h4>
            <SmallLine></SmallLine>

            <label htmlFor={position ? `colorName-${position}`: 'colorName'}>Color: </label>
            <input type='text' name={position ? `colorName-${position}`: 'colorName'} id={position ? `colorName-${position}`: 'colorName'} placeholder="Red" required />
            {/* defaultValue={flower ? flower.name : ''}  */}

            <FlexDiv>
                <p>Default Color: </p>
                <input type='radio' name={position ? `defaultColor-${position}` : 'defaultColor'} id={position ? `true-${position}`: 'true'} value={true} />
                <label htmlFor={position ? `true-${position}` : 'true'}>
                    <span>Yes</span>
                </label>

                <input type='radio' name={position ? `defaultColor-${position}` : 'defaultColor'} id={position ? `false-${position}`: 'false'} value={false} />
                {/* defaultChecked={flower ? !flower.defaultStyle ? true : false : ''} */}
                <label htmlFor={position ? `false-${position}`: 'false'}>
                    <span>No</span>
                </label>
            </FlexDiv>

            <label htmlFor={position ? `colorImage-${position}` : 'colorImage'}>Image: </label>
            <input type='file' name={position ? `colorImage-${position}` : 'colorImage'} id={position ? `colorImage-${position}` : 'colorImage'} onChange={handleChange} />
            <span>Please use a .jpg or .jpeg image. Square pictures are preferred.</span>

            <Image
                src={file}
                // src='/uploads/tempImg0.jpg'
                alt={`the uploaded image`}
                title={`Image preview`}
                width={200}
                height={200}
                onError={(e) => {
                    if (e.target.src.includes('no-image')) {
                        e.target.onError = null
                    } else {
                        file = '/no-image.jpg'
                        e.target.alt = 'A placeholder image'
                        e.target.srcset = ''
                        e.target.src = '/no-image.jpg'
                    }
                }}
            />

            {position ? position === 0 ? '' : <SmallButton text={`Remove Color ${position + 1}`} type='button' action={() => {removeColor(position)}}></SmallButton> : ''}
            <SmallLine></SmallLine>
        </FormStyling>
        )
    
}

export default ColorInput
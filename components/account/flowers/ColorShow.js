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

const ColorShow = ({ color, index, removeColor }) => {

    // color.colorImage ? file === '/no-image.jpg' ? file : file = `${file}?t=` + new Date().getTime() : file = `/no-image.jpg`

    return ( 
        <FormStyling key={index+'colorArea'}> 
            <SmallLine></SmallLine>
            <h4>Color {index + 1}</h4>
            <SmallLine></SmallLine>

            <label htmlFor={`colorName-${index}`}>Color: </label>
            <input type='text' name={`colorName-${index}`} id={`colorName-${index}`} placeholder="Red" required defaultValue={color.colorName} readonly/>

            <FlexDiv>
                <p>Default Color: </p>
                <input type='radio' name={`defaultColor-${index}`} id={`true-${index}`} value={true} readonly defaultChecked={color.defaultColor ? true : false}/>
                <label htmlFor={`true-${index}`}>
                    <p>Yes</p>
                </label>

                <input type='radio' name={`defaultColor-${index}`} id={`false-${index}`} value={false} readonly defaultChecked={!color.defaultColor ? true : false}/>
                <label htmlFor={`false-${index}`}>
                    <p>No</p>
                </label>
            </FlexDiv>

            <p>Image:</p>

            {/* <label htmlFor={position ? `colorImage-${position}` : 'colorImage'}>Image: </label>
            <input type='file' name={position ? `colorImage-${position}` : 'colorImage'} id={position ? `colorImage-${position}` : 'colorImage'} placeholder="pink-rose.jpg" onChange={handleChange} />
            <span>Please use a .jpg or .jpeg image. Square pictures are preferred.</span> */}

            <Image
                src={color.colorImage}
                // src='/uploads/tempImg0.jpg'
                alt={`the uploaded image`}
                title={`Image preview`}
                width={200}
                height={200}
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

            {/* {position ? position === 0 ? '' : <SmallButton text={`Remove Color ${position + 1}`} type='button' action={() => {removeColor(position)}}></SmallButton> : ''} */}
            <SmallLine></SmallLine>
        </FormStyling>
        )
    
}

export default ColorShow
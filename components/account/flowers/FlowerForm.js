import styled from "styled-components"
import { useRouter } from "next/router"
import Image from "next/image"
import ReactDOMServer from "react-dom/server";
import { findDOMNode } from 'react-dom';

import Button, { SmallButton } from 'components/Button'
// import StyleFieldset from 'components/account/dances/StyleFieldset'
// import FlowerFieldset from "./FlowerFieldset"

import { FlexButton } from 'components/styles/ButtonStyles'
import { StyledColumnForm } from "components/styles/FormStyles"
import Line, { SmallLine } from 'components/Line'
import { Fragment, useState } from "react"
import ColorInput from "./ColorInput"
import ColorShow from "./ColorShow";

export const StyledForm = styled(StyledColumnForm)`
    max-width: 500px;

    & span {
        width: 100%;  
        font-size: 1rem;
    }  

    & input {
        width: 100%;
    }
       
    p {
        width: 100%;
    }

`

const FlowerForm = ({ action, handleChange, image, colorArray, addColor, removeColor, flower }) => {
    const router = useRouter()

    console.log(colorArray)
    let outputThese = [...colorArray]
    outputThese.shift()
    console.log(outputThese)

    if (flower) {
        flower = flower[0]
    }

    // !style ? image ? image = `${image}?t=` + new Date().getTime() : image = `/no-image.jpg?t=` + new Date().getTime() : image ? image = `${image}?t=` + new Date().getTime() : image = `${style.image}?t=` + new Date().getTime()
    return (
        <StyledForm onSubmit={action}>
            <label htmlFor='name'>Flower Name: </label>
            <input type='text' name='name' id='name' placeholder="Rose" required defaultValue={colorArray.length !== 0 ? colorArray[0].flower : ''} />
            <SmallLine></SmallLine>

            <label htmlFor='description'>Description:</label>
            <textarea name='description' rows='4' defaultValue={flower ? flower.description : ''}></textarea>
            <Line></Line>
            <SmallLine></SmallLine>

            <h2>Colors:</h2>
            <span>When you remove a color that color and all colors after it will be removed.</span>
            <SmallLine></SmallLine>

            {colorArray?.map((colorSet, index) => {
                console.log(colorSet)
                // <ColorShow color={colorSet} index={index} removeColor={removeColor}></ColorShow>
            })}

            <ColorInput file={image} position={0} removeColor={removeColor} handleChange={handleChange}></ColorInput>



            <SmallLine></SmallLine>

            <SmallButton text='Add Color' type='button' action={addColor}></SmallButton>

            <SmallLine></SmallLine>

            <FlexButton>
                <Button type='submit' text={flower ? 'Update' : 'Add'}></Button><Button text='Back' type='button' action={() => { router.back() }}></Button>
            </FlexButton>
        </StyledForm>
    )
}

export default FlowerForm
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
import { SmallLine } from 'components/Line'
import { Fragment, useState } from "react"
import ColorInput from "./ColorInput"

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

const ColorForm = ({ action, handleChange, image, removeColor, flower, position }) => {
    const router = useRouter()

    if (flower) {
        flower = flower[0]
    }

    // !style ? image ? image = `${image}?t=` + new Date().getTime() : image = `/no-image.jpg?t=` + new Date().getTime() : image ? image = `${image}?t=` + new Date().getTime() : image = `${style.image}?t=` + new Date().getTime()
    return (
        <StyledForm onSubmit={action}>

            <ColorInput file={image} position={position} number={2} removeColor={removeColor} handleChange={handleChange}></ColorInput>
            <SmallLine></SmallLine>

            <FlexButton>
                <Button type='submit' text={flower ? 'Update' : 'Add'}></Button><Button text='Cancel' type='button' action={() => { router.back() }}></Button>
            </FlexButton>
        </StyledForm>
    )
}

export default ColorForm
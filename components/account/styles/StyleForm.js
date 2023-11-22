import styled from "styled-components"
import { useRouter } from "next/router"
import Image from "next/image"

import Button from 'components/Button'
// import StyleFieldset from 'components/account/dances/StyleFieldset'
// import FlowerFieldset from "./FlowerFieldset"

import { FlexButton } from 'components/styles/ButtonStyles'
import { StyledColumnForm } from "components/styles/FormStyles"
import { SmallLine } from 'components/Line'
import { Fragment, useState } from "react"

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

const StyledForm = styled(StyledColumnForm)`
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

const StyleForm = ({ action, supplies, flowers, style, handleChange, image }) => {
    const router = useRouter()

    if (style) {
        style = style[0]
    }

    !style ? image ? image = `${image}?t=` + new Date().getTime() : image = `/no-image.jpg?t=` + new Date().getTime() : image ? image = `${image}?t=` + new Date().getTime() : image = `${style.image}?t=` + new Date().getTime()
    return (
        <StyledForm onSubmit={action}>
            <label htmlFor='name'>Name: </label>
            <input type='text' name='name' id='name' placeholder="No Pin Rose" required defaultValue={style ? style.name : ''} />
            <span>{`Don't put boutonniere or corsage in the style name.`}</span>
            <SmallLine></SmallLine>

            <FlexDiv>
                <p>Type: </p>
                <input type='radio' name='type' id='boutonniere' value='boutonniere' defaultChecked={style === 'boutonniere' ? true : false}/>
                <label htmlFor='boutonniere'>
                    <p>Boutonniere</p>
                </label>

                <input type='radio' name='type' id='corsage' value='corsage' defaultChecked={style === 'corsage' ? true : false}/>
                <label htmlFor='corsage'>
                    <p>Corsage</p>
                </label>
            </FlexDiv>
            <SmallLine></SmallLine>

            <label htmlFor='flower'>Flower:</label>
            <select name='flower' id='flower' defaultValue={style ? style.flower : ''}>
                {flowers?.map((flower) => {
                    return <option value={flower.name} key={flower.name}>{flower.name}</option>
                })}
            </select>
            <SmallLine></SmallLine>

            <label htmlFor='price'>Price: </label>
            <input type='number' name='price' id='price' placeholder="24.99" min={0} step='any' required defaultValue={style ? style.price : ''} />
            <SmallLine></SmallLine>

            <label htmlFor='description'>Description:</label>
            <textarea name='description' rows='4' defaultValue={style ? style.description : ''}></textarea>
            <SmallLine></SmallLine>

            <p>Supplies: </p>
            <span>You can select multiple. Green boxes indicate selected.</span>
            <FlexDiv>
                {supplies?.map((supply) => {
                    return (
                        <Fragment key={supply._id}>
                            <input  type='checkbox' name='supplies' id={supply.name} value={supply._id} className="supplies" defaultChecked={style ? style.supplies.includes(supply._id) ? true : false : ''}/>
                            <label htmlFor={supply.name}>
                                <p>{supply.name}</p>
                            </label>
                        </Fragment>
                    )
                })}
            </FlexDiv>
            <SmallLine></SmallLine>

            <FlexDiv>
                <p>Default Style: </p>
                <input type='radio' name='defaultStyle' id='true' value={true} defaultChecked={style ? style.defaultStyle === true ? true : false : ''}/>
                <label htmlFor='true'>
                    <p>Yes</p>
                </label>

                <input type='radio' name='defaultStyle' id='false' value={false} defaultChecked={style ? style.defaultStyle === false ? true : false: ''}/>
                <label htmlFor='false'>
                    <p>No</p>
                </label>
            </FlexDiv>
            <SmallLine></SmallLine>

            <label htmlFor='pageColor'>Border Color: </label>
            <input type='text' name='pageColor' id='pageColor' placeholder="red" required defaultValue={style ? style.pageColor : ''} />
            <span>This helps people see the style of an order at a glance.</span>
            <SmallLine></SmallLine>

            <label htmlFor='image'>Image: </label>
            <input type='file' name='image' id='image' placeholder="rose-corsage.jpg" required onChange={handleChange} />
            <span>Please use a .jpg or .jpeg image. Square pictures are preferred.</span>

            <Image 
                src={image}
                alt={`the uploaded image`}
                title={`Image preview`}
                width={500}
                height={500}
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

            <FlexButton>
                <Button type='submit' text={style ? 'Update' : 'Create'}></Button><Button text='Back' type='button' action={() => { router.back() }}></Button>
            </FlexButton>
        </StyledForm>
    )
}

export default StyleForm
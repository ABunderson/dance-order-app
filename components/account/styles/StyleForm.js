import { useRouter } from 'next/router'
import Image from 'next/image'
import { Fragment } from 'react'

import Button from 'components/Button'
import { SmallLine } from 'components/Line'

import styled from 'styled-components'
import { FlexButton } from 'components/styles/ButtonStyles'
import { StyledColumnForm, RadioRules } from 'components/styles/FormStyles'

const FlexDiv = styled(RadioRules)`
    padding-top: 10px;
    padding-bottom: 10px;
    align-items: center;
    display: flex;
    gap: 15px;
    width: 100%;
    max-width: 100%;

    p {
        max-width: 150px;
    } 

    span {
        display: block;
        text-align: center;
        font-size: 1.4rem !important; 
    }

    @media (max-width: 650px) {
        p {
            max-width: 100%;
        }

        flex-wrap: wrap;
    }
`

const StyledForm = styled(StyledColumnForm)`
    max-width: 500px;
    width: 100%;

    span {
        width: 100%;  
        font-size: 1rem;
    }  

    input, p {
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
            <input type='text' name='name' id='name' placeholder='No Pin Rose' required defaultValue={style ? style.name : ''} />
            <span>{`Don't put boutonniere or corsage in the style name.`}</span>
            <SmallLine></SmallLine>

            <FlexDiv>
                <p>Type: </p>
                <input type='radio' name='type' id='boutonniere' value='boutonniere' defaultChecked={style ? style.type === 'boutonniere' ? true : false : ''}/>
                <label htmlFor='boutonniere'>
                    <span>Boutonniere</span>
                </label>

                <input type='radio' name='type' id='corsage' value='corsage' defaultChecked={style ? style.type === 'corsage' ? true : false : ''}/>
                <label htmlFor='corsage'>
                    <span>Corsage</span>
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
            <input type='number' name='price' id='price' placeholder='24.99' min={0} step='any' required defaultValue={style ? style.price : ''} />

            <SmallLine></SmallLine>

            <label htmlFor='description'>Description:</label>
            <textarea id='description' name='description' rows='4' defaultValue={style ? style.description : ''}></textarea>

            <SmallLine></SmallLine>

            <p>Supplies: </p>
            <span>You can select multiple. Green boxes indicate selected.</span>

            <FlexDiv>
                {supplies?.map((supply) => {
                    return (
                        <Fragment key={supply._id}>
                            <input  type='checkbox' name='supplies' id={supply.name.split(' ').join('')} value={supply._id} className='supplies' defaultChecked={style ? style.supplies.includes(supply._id) ? true : false : ''}/>
                            <label htmlFor={supply.name.split(' ').join('')}>
                                <span>{supply.name}</span>
                            </label>
                        </Fragment>
                    )
                })}
            </FlexDiv>

            <SmallLine></SmallLine>

            <FlexDiv>
                <p>Default Style: </p>
                <input type='radio' name='defaultStyle' id='true' value={true} defaultChecked={style ? style.defaultStyle ? true : false : ''}/>
                <label htmlFor='true'>
                    <span>Yes</span>
                </label>

                <input type='radio' name='defaultStyle' id='false' value={false} defaultChecked={style ? !style.defaultStyle ? true : false : ''}/>
                <label htmlFor='false'>
                    <span>No</span>
                </label>
            </FlexDiv>

            <SmallLine></SmallLine>

            <label htmlFor='pageColor'>Border Color: </label>
            <input type='text' name='pageColor' id='pageColor' placeholder='red' required defaultValue={style ? style.pageColor : ''} />
            <span>This helps people see the style of an order at a glance.</span>

            <SmallLine></SmallLine>

            <label htmlFor='image'>Image: </label>
            <input type='file' name='image' id='image' onChange={handleChange} />
            <span>Please use a .jpg or .jpeg image. Square pictures are preferred.</span>

            <Image 
                src={image}
                alt={`the uploaded image`}
                title={`Image preview`}
                width={500}
                height={500}
                style={{ height:'auto', width: '100%', maxWidth: '500px'}}
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
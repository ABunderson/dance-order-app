import { StyledForm } from "components/styles/FormStyles"
import Button from 'components/Button'
import StyleFieldset from 'components/account/dances/StyleFieldset'
import styled from "styled-components"
import FlowerFieldset from "./FlowerFieldset"

// return <ArrayFieldset item={item} key={keyName} keyValue={keyName}></ArrayFieldset>

const FormDiv = styled.div`
    display: flex;
    flex-wrap: wrap; 
    row-gap: 15px;
    font-size: 1.2em;
    align-items: center;

    max-width: 450px;

    input {
        flex-basis: 50%;
    }

    & label {
        flex-basis: 35%;
    }

    & button {
        flex-basis: 92%;
    } 
`

const DanceForm = ({ action, styles, flowers }) => {


    return (
        <StyledForm onSubmit={action}>
            <FormDiv>
                <label htmlFor='name'>Name: </label>
                <input type='text' name='name' id='name' placeholder="LP, Maser" required />
                <span style={{ fontSize: '1rem' }}>You can put anything for the dance name. Date or schools seem useful</span>

                <label htmlFor='danceDate'>Dance Date: </label>
                <input type='date' name='danceDate' id='danceDate' required />
                <span style={{ fontSize: '1rem' }}>Please pick the Saturday of the week of the dance.</span>

                <label htmlFor='schools'>Schools: </label>
                <input type='text' name='schools' id='schools' placeholder="LP" />
                <span style={{ fontSize: '1rem' }}>Put a list of schools seperated by commas.</span>
            </FormDiv>
            <StyleFieldset styles={styles} key={`styles`}></StyleFieldset>

            {flowers.map((flower) => {
                return <FlowerFieldset flower={flower} key={flower.name}></FlowerFieldset>
            })}



            <Button type='submit' text='Create'></Button>
        </StyledForm>
    )
}

export default DanceForm
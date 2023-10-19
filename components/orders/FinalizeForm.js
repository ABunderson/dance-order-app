import styled from "styled-components"
import StyleRows from "./StyleRows"
import AddonRows from "./AddonRows"
import Button from 'components/Button'
import { FlexButton } from 'components/styles/ButtonStyles'
import Line from 'components/Line'
import { StyledForm } from "../styles/FormStyles"

const StyledFinalForm = styled.form`
display: flex;
flex-direction: column;
width: 100%;
row-gap: 15px;
font-size: 1.2em;
align-items: left;

button {
    margin-top: 10px;
    max-width: 300px;
}

h2 {
    font-size: 1em;
    width: 100%;
}

input[type='radio'] {
    display: none;
}

input[type='radio']:checked+label{
   background-color: var(--main-green);
}

label {
    display: block;
    border: 1px solid black;
    border-radius: 15px;
    height: auto;
    padding: 1rem;
    width: 100%;
    margin: 10px;
    max-width: 250px;

    p {
        text-align: center;
        text-transform: capitalize;
    }
}

@media (max-width: 550px) {
    max-width: 100%;
    width: 100%;

    & input {
        flex-basis: 100%;
        width: 100%;
    }

    & label {
        flex-basis: 100%;
        max-width: 100%;
    }

    & button {
        flex-basis: 100%;
        margin-top: 20px;
    }
} 
`

const FlexDiv = styled.div`
    display: flex;
    gap: 15px;

    > div {
        width: 50%;
    }

    @media (max-width: 650px) {
        flex-wrap: wrap;

        > div {
            width: 100%;
        }
    }
`


const FinalizeOutput = ({ submitAction }) => {

    return (
        <StyledFinalForm onSubmit={submitAction}>
            <div>
                <h2>Pick your pickup day directly below.</h2>
            </div>
            <FlexDiv>
                <input type='radio' name='pickupDay' id='pickupFri' value='friday' />
                <label htmlFor='pickupFri'>
                    <p>Friday</p>
                    <p>3 pm - 6 pm</p>
                </label>

                <input type='radio' name='pickupDay' id='pickupSat' value='saturday' />
                <label htmlFor='pickupSat'>
                    <p>Saturday</p>
                    <p>9 am - 2 pm</p>
                </label>
            </FlexDiv>
            <Line></Line>
            <div>
                <h2>The buttons below are for the employees when they confirm your order</h2>
            </div>
            <FlexDiv>
                <input type='radio' name='finishType' id='print' value='print' />
                <label htmlFor='print'>
                    <p>Print</p>
                </label>

                <input type='radio' name='finishType' id='wait' value='wait' />
                <label htmlFor='wait'>
                    <p>Wait to Print</p>
                </label>
            </FlexDiv>
            <Button text='Finish' type='submit'></Button>
        </StyledFinalForm>
    )
}

export default FinalizeOutput
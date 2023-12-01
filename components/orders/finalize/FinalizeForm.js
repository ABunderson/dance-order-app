import styled from 'styled-components'

import Button from 'components/Button'
import Line from 'components/Line'

const StyledFinalForm = styled.form`
display: flex;
flex-direction: column;
width: 100%;
row-gap: 15px;
font-size: 1.2em;

input[type='text'], textarea {
    font-size: .75em;
    padding: 5px;
    background-color: gainsboro;
    margin-top: 5px;
    margin-bottom: 10px;
}

textarea {
    max-width: 550px;
    font-size: 1em;
}

input[type='text'] {   
    max-width: 278px;
}

button {
    margin-top: 10px;
    max-width: 278px;
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

    span {
        text-align: center;
        text-transform: capitalize;
        display: block;
    }
}

@media (max-width: 550px) {
    max-width: 100%;
    width: 100%;

    input, input[type='text'] {
        flex-basis: 100%;
        width: 100%;
        max-width: 100%;
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

    @media (max-width: 650px) {
        flex-wrap: wrap;
    }
`

const FinalizeForm = ({ submitAction }) => {

    return (
        <StyledFinalForm onSubmit={submitAction}>

            <h2>Pick your pickup day directly below.</h2>

            <FlexDiv>
                <input type='radio' name='pickupDay' id='pickupFri' value='friday' />
                <label htmlFor='pickupFri'>
                    <span>Friday</span>
                    <span>3 pm - 6 pm</span>
                </label>

                <input type='radio' name='pickupDay' id='pickupSat' value='saturday' />
                <label htmlFor='pickupSat'>
                    <span>Saturday</span>
                    <span>9 am - 2 pm</span>
                </label>
            </FlexDiv>

            <h2>When would you like to pay?</h2>

            <FlexDiv>
                <input type='radio' name='payTime' id='payNow' value='now' />
                <label htmlFor='payNow'>
                    <span>Pay now</span>
                </label>

                <input type='radio' name='payTime' id='payLater' value='later' />
                <label htmlFor='payLater'>
                    <span>Pay when Pick Up</span>
                </label>
            </FlexDiv>
            <Line></Line>
            <Line></Line>

            <h2>The section below is for the employees when they confirm your order.</h2>

            <FlexDiv>
                <input type='radio' name='finishType' id='print' value='print' />
                <label htmlFor='print'>
                    <span>Print</span>
                </label>

                <input type='radio' name='finishType' id='wait' value='wait' />
                <label htmlFor='wait'>
                    <span>Wait to Print</span>
                </label>
            </FlexDiv>

            <h2>Are the flowers going to be saved?</h2>

            <FlexDiv>
                <input type='radio' name='saveFlower' id='yes' value='yes' />
                <label htmlFor='yes'>
                    <span>Yes</span>
                </label>

                <input type='radio' name='saveFlower' id='no' value='no' />
                <label htmlFor='no'>
                    <span>No</span>
                </label>
            </FlexDiv>

            <h2>Employee Initials</h2>

            <input type='text' name='initials' required />

            <h2>Special Instructions</h2>

            <textarea name='specialInstructions' rows='3'></textarea>

            <Button text='Finish' type='submit'></Button>
        </StyledFinalForm>
    )
}

export default FinalizeForm
import Button from 'components/Button'

import { StyledColumnForm } from 'components/styles/FormStyles'

const InformationForm = ({ action }) => {

    return (
        <StyledColumnForm onSubmit={action}>
            <label htmlFor='firstName'>First Name: </label>
            <input type='text' name='firstName' id='firstName' placeholder='John' required />

            <label htmlFor='lastName'>Last Name: </label>
            <input type='text' name='lastName' id='lastName' placeholder='Smith' required />

            <label htmlFor='phoneOne'>Phone 1: </label>
            <input type='text' name='phoneOne' id='phoneOne' placeholder='8017638721' pattern='[0-9]{10}' title='Please put in 10 numbers with no other characters' required />

            <label htmlFor='phoneTwo'>Phone 2: </label>
            <input type='text' name='phoneTwo' id='phoneTwo' placeholder='8017638721' pattern='[0-9]{10}' title='Please put in 10 numbers with no other characters' required />

            <label htmlFor='danceDate'>Dance Date: </label>
            <input type='date' name='danceDate' id='danceDate' required />
            <span style={{ fontSize: '1rem' }}>Please pick the Saturday of the week your dance is on and talk to a designer at the end if the dance is on a different day.</span>

            <label htmlFor='school'>School: </label>
            <input type='text' name='school' id='school' placeholder='LP' required />

            <label htmlFor='dressColor'>Dress Color: </label>
            <input type='text' name='dressColor' id='dressColor' placeholder='Black with multicolor flowers' required />

            <Button type='submit' text='Continue'></Button>
        </StyledColumnForm>
    )
}

export default InformationForm
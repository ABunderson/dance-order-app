import styled from 'styled-components'
import { useRouter } from 'next/router'

import Button from 'components/Button'
import StyleFieldset from 'components/account/dances/StyleFieldset'
import FlowerFieldset from 'components/account/dances/FlowerFieldset'

import { FlexButton } from 'components/styles/ButtonStyles'
import { StyledForm } from 'components/styles/FormStyles'
import { BasicFlex } from 'components/styles/BasicFlex'

const FormDiv = styled(BasicFlex)`
    max-width: 450px;

    input {
        flex-basis: 60%;
    }

    label {
        flex-basis: 35%;
    }

    button {
        flex-basis: 92%;
    } 

    @media (max-width: 450px) {
        max-width: 100%;
        width: 100%;
    
        input {
            flex-basis: 100%;
            width: 100%;
            max-width: 300px;
        }
    
        label {
            flex-basis: 100%;
        }
    }  
`



const DanceForm = ({ action, styles, flowers, dance }) => {
    const router = useRouter()

    if (dance) {
        dance = dance[0]
    }

    return (
        <StyledForm onSubmit={action}>

            <FormDiv>
                <label htmlFor='name'>Name: </label>
                <input type='text' name='name' id='name' placeholder='LP, Maeser' required defaultValue={dance ? dance.name : ''} />
                <span style={{ fontSize: '1rem' }}>You can put anything for the dance name. Date or schools seem useful</span>

                <label htmlFor='danceDate'>Dance Date: </label>
                <input type='date' name='danceDate' id='danceDate' required defaultValue={dance ? dance.danceDate : ''} />
                <span style={{ fontSize: '1rem' }}>Please pick the Saturday of the week of the dance.</span>

                <label htmlFor='schools'>Schools: </label>
                <input type='text' name='schools' id='schools' placeholder='LP' defaultValue={dance ? dance.schools : ''} />
                <span style={{ fontSize: '1rem' }}>Put a list of schools seperated by commas.</span>
            </FormDiv>

            <StyleFieldset styles={styles} dance={dance} key={'styles'} ></StyleFieldset>

            {flowers?.map((flower) => {
                return <FlowerFieldset flower={flower} key={flower.name} dance={dance}></FlowerFieldset>
            })}

            <FlexButton>
                <Button type='submit' text={dance ? 'Update' : 'Create'}></Button><Button text='Back' type='button' action={() => { router.back() }}></Button>
            </FlexButton>
        </StyledForm>
    )
}

export default DanceForm
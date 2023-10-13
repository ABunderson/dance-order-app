import styled from 'styled-components'
import { useState } from 'react'
import { hashPassword} from 'components/account/Hashing'
import Login from 'components/account/Login'
import { LargeButton } from 'components/Button'

export const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap; 
    max-width: 400px;
    row-gap: 15px;
    font-size: 1.2em;
    align-items: center;

    & input {
        font-size: .75em;
        flex-basis: 50%;
        padding: 5px;
        background-color: gainsboro;
    }

    & label {
        flex-basis: 35%;
    }

    & button {
        margin-top: 10px;
        flex-basis: 92%;
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
        }
    
        & button {
            flex-basis: 100%;
            margin-top: 20px;
        }
    }  
`

const LoginForm = ({ }) => {
    const [userName, setUserName] = useState('')
    // const [password, setPassword] = useState('')

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });
        // console.log(convertedJSON)

        convertedJSON.password = await hashPassword(convertedJSON.password)

        // console.log(convertedJSON)

        Login(convertedJSON)

        event.target.reset()
    }


    return (
        <StyledForm onSubmit={onSubmit}>
            <label htmlFor='userName'>Username: </label>
            <input type='text' name='userName' id='userName' onChange={e => setUserName(e.target.value)} value={userName} required />
            
            <label htmlFor='password'>Password: </label>
            <input type='password' name='password' id='password' defaultValue={''} />
            
            <LargeButton text='Login' type='submit'></LargeButton>
        </StyledForm>
    )
}

export default LoginForm
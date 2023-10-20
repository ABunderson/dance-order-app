import styled from 'styled-components'
import { useState } from 'react'
import { hashPassword} from 'components/account/Hashing'
import Login from 'components/account/Login'
import Button from 'components/Button'
import { StyledColumnForm } from 'components/styles/FormStyles'

const LoginForm = ({ action }) => {
    const [userName, setUserName] = useState('')
    // const [password, setPassword] = useState('')

    return (
        <StyledColumnForm onSubmit={action}>
            <label htmlFor='userName'>Username: </label>
            <input type='text' name='userName' id='userName' onChange={e => setUserName(e.target.value)} value={userName} required />
            
            <label htmlFor='password'>Password: </label>
            <input type='password' name='password' id='password' defaultValue={''} required/>
            
            <Button text='Login' type='submit'></Button>
        </StyledColumnForm>
    )
}

export default LoginForm
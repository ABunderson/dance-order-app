import { useRouter } from 'next/router'
import { useState } from 'react'

import Button from 'components/Button'
import { StyledColumnForm } from 'components/styles/FormStyles'

const LoginForm = ({ action }) => {
    const [userName, setUserName] = useState('')
    const router = useRouter()

    return (
        <StyledColumnForm onSubmit={action}>
            <label htmlFor='userName'>Username: </label>
            <input type='text' name='userName' id='userName' onChange={e => setUserName(e.target.value)} value={userName} required />
            
            <label htmlFor='password'>Password: </label>
            <input type='password' name='password' id='password' defaultValue={''} required/>
            
            <Button text='Login' type='submit'></Button>
            <Button text='New User' type='button' action={() => {router.push('/account/newUser')}}></Button>
        </StyledColumnForm>
    )
}

export default LoginForm
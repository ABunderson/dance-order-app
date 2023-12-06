import { useRouter } from 'next/router'
import { useState } from 'react'

import Button from 'components/Button'

import { StyledColumnForm } from 'components/styles/FormStyles'

const NewUserForm = ({ action }) => {
    const [userName, setUserName] = useState('')
    const router = useRouter()

    return (
        <StyledColumnForm onSubmit={action}>
            <label htmlFor='username'>Username: </label>
            <input type='text' name='username' id='username' onChange={e => setUserName(e.target.value)} value={userName} required/>

            <label htmlFor='password'>Password: </label>
            <input type='password' name='password' id='password' defaultValue={''} required pattern='(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'/>
            <p style={{fontSize:'1.15rem'}}>Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter, and 1 special character</p>

            <label htmlFor='shop'>Shop: </label>
            <input type='text' name='shop' id='shop' defaultValue={''} required/>
            
            <label htmlFor='shopCode'>Shop Code: </label>
            <input type='text' name='shopCode' id='shopCode' defaultValue={''} required/>
            
            <Button text='Create' type='submit'></Button>
            <Button text='Back' type='button' action={() => {router.back()}}></Button>
        </StyledColumnForm>
    )
}

export default NewUserForm
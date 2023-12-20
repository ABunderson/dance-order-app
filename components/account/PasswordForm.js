import { useRouter } from 'next/router'

import Button from 'components/Button'

import { StyledColumnForm } from 'components/styles/FormStyles'

const PasswordForm = ({ action }) => {
    const router = useRouter()

    return (
        <StyledColumnForm onSubmit={action}>
            <label htmlFor='password'>Password: </label>
            <input type='password' name='password' id='password' defaultValue={''} required pattern='(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'/>
            <p style={{fontSize:'1.15rem'}}>Passwords must be at least 8 characters and contain at least 1 number, 1 capital letter, and 1 special character</p>
            
            <Button text='Change' type='submit'></Button>
            <Button text='Back' type='button' action={() => {router.back()}}></Button>
        </StyledColumnForm>
    )
}

export default PasswordForm
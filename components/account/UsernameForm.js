import { useRouter } from 'next/router'

import Button from 'components/Button'

import { StyledColumnForm } from 'components/styles/FormStyles'

const UsernameForm = ({ action }) => {
    const router = useRouter()

    return (
        <StyledColumnForm onSubmit={action}>
            <label htmlFor='username'>Username: </label>
            <input type='text' name='username' id='username' required/>
            
            <Button text='Change' type='submit'></Button>
            <Button text='Back' type='button' action={() => {router.back()}}></Button>
        </StyledColumnForm>
    )
}

export default UsernameForm
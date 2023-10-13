import { StyledForm } from "../account/LoginForm"
import { LargeButton} from 'components/Button'


const InformationForm = ({action}) => {
    return (
        <StyledForm onSubmit={action}>
            <label htmlFor='firstName'>First Name: </label>
            <input type='text' name='firstName' id='firstName' required placeholder="John"/>
            
            <label htmlFor='lastName'>Last Name: </label>
            <input type='text' name='lastName' id='lastName' required placeholder="Smith" />
            
            <label htmlFor='phoneOne'>Phone 1: </label>
            <input type='text' name='phoneOne' id='phoneOne' placeholder="801-763-2227" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
            
            <label htmlFor='phoneTwo'>Phone 2: </label>
            <input type='text' name='phoneTwo' id='phoneTwo' required placeholder="801-763-2227"/>
            
            <label htmlFor='danceDate'>Dance Date: </label>
            <input type='date' name='danceDate' id='danceDate' required />
            
            <label htmlFor='school'>School: </label>
            <input type='text' name='school' id='school' required placeholder="LP"/>
            
            <label htmlFor='dressColor'>Dress Color: </label>
            <input type='text' name='dressColor' id='dressColor' required />
            
            <LargeButton type='submit' text='Continue'></LargeButton>
        </StyledForm>
    )
}

export default InformationForm
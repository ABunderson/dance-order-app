import { StyledColumnForm } from "components/styles/FormStyles"
import Button from 'components/Button'


const InformationForm = ({action}) => {
    return (
        <StyledColumnForm onSubmit={action}>
            <label htmlFor='firstName'>First Name: </label>
            <input type='text' name='firstName' id='firstName'  placeholder="John"/>
            
            <label htmlFor='lastName'>Last Name: </label>
            <input type='text' name='lastName' id='lastName'  placeholder="Smith" />
            
            <label htmlFor='phoneOne'>Phone 1: </label>
            <input type='text' name='phoneOne' id='phoneOne' placeholder="801-763-2227"  />
            {/* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
            
            <label htmlFor='phoneTwo'>Phone 2: </label>
            <input type='text' name='phoneTwo' id='phoneTwo'  placeholder="801-763-2227"/>
            
            <label htmlFor='danceDate'>Dance Date: </label>
            <input type='date' name='danceDate' id='danceDate'  />
            
            <label htmlFor='school'>School: </label>
            <input type='text' name='school' id='school' placeholder="LP"/>
            
            <label htmlFor='dressColor'>Dress Color: </label>
            <input type='text' name='dressColor' id='dressColor' />
            
            <Button type='submit' text='Continue'></Button>
        </StyledColumnForm>
    )
}

export default InformationForm
import { StyledForm } from 'components/styles/FormStyles'
import { FlexButton } from 'components/styles/ButtonStyles'
import Button from 'components/Button'
import RibbonFieldset from "./RibbonFieldset"
import SingleFieldset from './SingleFieldset'
import ArrayFieldset from './ArrayFieldset'

const AddonForm = ({ backAction, forwardAction, addons, ribbon }) => {


    const chooseFieldset = (item, keyName) => {
        if (item.colors === 'ribbon') {
            return <RibbonFieldset item={item} ribbon={ribbon} key={keyName} keyValue={keyName}></RibbonFieldset>
            // return <p key={keyName}>ribbon</p>
        } else if (!item.colors) {
            return <SingleFieldset item={item} key={keyName} keyValue={keyName}></SingleFieldset>
            // return <p key={keyName}>single</p>
        } else {
            return <ArrayFieldset item={item} key={keyName} keyValue={keyName}></ArrayFieldset>
            // return <p key={keyName}>array</p>
        }
        
    }

    return (
        <StyledForm onSubmit={forwardAction}>

            {addons.map((item) => {
                let keyName = item.name + 'Fieldset';
                return chooseFieldset(item, keyName)
            })}
            <FlexButton>
                <Button text='Back' type='button' action={backAction}></Button>
                <Button text='Continue' type='submit'></Button>
            </FlexButton>

        </StyledForm>
    )

}

export default AddonForm
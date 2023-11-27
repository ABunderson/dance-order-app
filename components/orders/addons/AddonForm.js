import Button from 'components/Button'
import RibbonFieldset from 'components/orders/addons/RibbonFieldset'
import SingleFieldset from 'components/orders/addons/SingleFieldset'
import ArrayFieldset from 'components/orders/addons/ArrayFieldset'

import { StyledForm } from 'components/styles/FormStyles'
import { FlexButton } from 'components/styles/ButtonStyles'

const AddonForm = ({ backAction, forwardAction, addons, ribbon, order }) => {

    const styleObj = order.style

    if (styleObj?.slapColor) {
        addons.map((item, index) => {
            if (item.name === 'slap') {
                addons.splice(index, 1)
            }
        })
    }

    const chooseFieldset = (item, keyName) => {
        if (item.colors === 'ribbon') {
            return <RibbonFieldset item={item} ribbon={ribbon} key={keyName} keyValue={keyName} order={order}></RibbonFieldset>

        } else if (!item.colors) {
            return <SingleFieldset item={item} key={keyName} keyValue={keyName}></SingleFieldset>

        } else {
            return <ArrayFieldset item={item} key={keyName} keyValue={keyName}></ArrayFieldset>
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
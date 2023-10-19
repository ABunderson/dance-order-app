import styled from "styled-components"
import { StyledForm } from 'components/styles/FormStyles'
import { FlexButton } from 'components/styles/ButtonStyles'
import Button from 'components/Button'
import Fieldset from "./Fieldset"

const CustomizeForm = ({backAction, forwardAction, flower, supplies, styleId}) => {


    return (
        <StyledForm onSubmit={forwardAction}>
            <input type="hidden" name="styleId" value={styleId}/>
            {flower[0] ? <Fieldset item={flower[0]} type='flower'></Fieldset>: ''}
            {supplies[0] ? <Fieldset item={supplies[0]} type={supplies[0].name}></Fieldset>: ''}

            <FlexButton>
                <Button text='Back' type='button' action={backAction}></Button>
                <Button text='Continue' type='submit'></Button>
            </FlexButton>

        </StyledForm>
    )

}

export default CustomizeForm
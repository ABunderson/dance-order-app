import styled from "styled-components"
import { StyledForm } from 'components/styles/FormStyles'
import { FlexButton } from 'components/styles/ButtonStyles'
import Button from 'components/Button'
import Fieldset from "./Fieldset"

const CustomizeForm = ({ backAction, forwardAction, flower, supplies, styleId, flowerColors }) => {

    let defaultFlower = { ...flower[0] }

    if (flowerColors.length === 0) {

        let defaultColors = flower[0].colors.filter((item) => {
            return item.defaultColor === true
        })

        defaultFlower.colors = defaultColors

    } else {

        let defaultColors = flower[0].colors.filter((item) => {
             return flowerColors[0].colors.includes(item.colorName)
        })

        defaultFlower.colors = defaultColors
    }

    return (
        <StyledForm onSubmit={forwardAction}>
            <input type="hidden" name="styleId" value={styleId} />
            {flower[0] ? <Fieldset item={defaultFlower} type='flower'></Fieldset> : ''}
            {supplies[0] ? <Fieldset item={supplies[0]} type={supplies[0].name}></Fieldset> : ''}

            <FlexButton>
                <Button text='Back' type='button' action={backAction}></Button>
                <Button text='Continue' type='submit'></Button>
            </FlexButton>

        </StyledForm>
    )

}

export default CustomizeForm
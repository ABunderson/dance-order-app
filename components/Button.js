import { StyledLargeButton, StyledButton } from 'components/styles/ButtonStyles'

const SmallButton = ({ text, type, action }) => {
    return (
        <StyledButton type={type} onClick={action}>
            {text}
        </StyledButton>
    )
}


const Button = ({ text, type, action }) => {
    return (
        <StyledLargeButton type={type} onClick={action}>
            {text}
        </StyledLargeButton>
    )
}

export default Button
export { SmallButton }
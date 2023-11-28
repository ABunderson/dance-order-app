import { StyledLargeButton, StyledButton } from 'components/styles/ButtonStyles'

const SmallButton = ({ text, type, action, id }) => {
    if (id) {
        return (
            <StyledButton type={type} onClick={action} id={id}>
                {text}
            </StyledButton>
        )
    } else {
        return (
            <StyledButton type={type} onClick={action}>
                {text}
            </StyledButton>
        )
    }
}


const Button = ({ text, type, action, id }) => {
    if (id) {
        return (
            <StyledLargeButton type={type} onClick={action} id={id ? id : text + action}>
                {text}
            </StyledLargeButton>
        )
    } else {
        return (
            <StyledLargeButton type={type} onClick={action}>
                {text}
            </StyledLargeButton>
        )
    }
}

export default Button
export { SmallButton }
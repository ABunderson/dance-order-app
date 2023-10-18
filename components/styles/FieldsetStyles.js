import styled from 'styled-components'

export const StyledFieldset = styled.fieldset`
width: 100%;
border: 4px solid var(--main-green);
border-radius: 15px;
padding: 1rem;

legend {
    text-transform: capitalize;
    padding: 5px;
}

input[type='radio'], input[type='checkbox'] {
    display: none;
}

input[type='radio']:checked+label{
   background-color: var(--main-green);
}
input[type='checkbox']:checked+label{
    background-color: var(--main-green);
 }

p {
    margin-bottom: 10px;
}

.ribbonColors {
    height: 150px;
    width: 150px;
}

.ribbonLabel {
    display: inline-block;
    border-radius: 0;
    // padding: 0;
    border: none;
}
label {
    display: block;
    border: 1px solid black;
    border-radius: 15px;
    height: auto;
    padding: 1rem;
    width: auto;

    p {
        text-align: center;
        text-transform: capitalize;
    }

    img {
        width: 100%;
        height: auto;
        max-width: 100%;
        min-width: 150px;
    }
}
`
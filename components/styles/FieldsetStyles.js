import styled from 'styled-components'

//  use I
export const StyledFieldset = styled.fieldset`
cursor: pointer;
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

input[type='radio']:checked+label, input[type='checkbox']:checked+label{
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
    border: none;
}

.colorDiv {
    background-color: peach;
    height: 50px;
    width: 50px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
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

@media (max-width: 650px){
    label {
        img {
            max-width: 100%;
        }
    }
}
`

// use II
const DanceFieldset = styled(StyledFieldset)`

    label {
        height: 100%;
        img, p {
            text-align: center;
            max-width: 250px;
            width: 100%;
            height: auto;
        }
    }
    @media (max-width: 650px) {
        label {
            img {
                max-width: 100%;
                height: auto;
            } 
        }
    }
`
export { StyledFieldset, DanceFieldset }
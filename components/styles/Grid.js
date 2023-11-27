import styled from "styled-components"

export const GridDiv = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12em, 15em));
    > div {
        width: auto;
    }
    justify-content: space-evenly;
    gap: 10px;
    row-gap: 30px;

    @media (max-width: 650px) {
        p {
            text-align: center;
        }
        div {
            width: 100%;
            
        }
    }
`

// use IIII
export const FieldsetGridDiv = styled(GridDiv)`
    grid-template-columns: repeat(auto-fit, minmax(8em, 12em));
`

// const FlexGrid = ({ children }) => {

//     return (
//         <GridDiv>
//             {children}
//         </GridDiv>
//     )

// }

// export default FlexGrid

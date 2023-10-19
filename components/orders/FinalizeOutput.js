import styled from "styled-components"
import StyleRows from "./StyleRows"
import AddonRows from "./AddonRows"

const OutputDiv = styled.div`
    // display: flex;
    // gap: 15px;
    border: 4px solid var(--main-green);
    width: 100%;
    padding: 1rem;
    border-radius: 15px;
    table {
        width: 100%;
        max-width: 400px;
        border: 1px solid black;
    }
    table, th, td {
        border-collapse: collapse;
        // border: 1px solid black;
      }

      td, th {
        padding: 5px;
        border: 1px solid black;
        text-transform: capitalize;
      }
      th {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: left;
      }

    > div {
        width: 50%;
    }

    @media (max-width: 650px) {
        flex-wrap: wrap;

        > div {
            width: 100%;
        }
    }
`


const FinalizeOutput = ({ order, style }) => {
    console.log(order)
    console.log(style)




    return (
        <OutputDiv>
            <table>
                <tbody>
                    <tr>
                        <th colSpan={2}>Personal Information</th>
                    </tr>
                    <tr>
                        <td style={{ width: '45%' }}>First Name:</td>
                        <td>{order.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>{order.lastName}</td>
                    </tr>
                    <tr>
                        <td>Phone number 1:</td>
                        <td>{order.phoneOne}</td>
                    </tr>
                    <tr>
                        <td>Phone number 2:</td>
                        <td>{order.phoneTwo}</td>
                    </tr>
                    <tr>
                        <td>Dress Color:</td>
                        <td>{order.dressColor}</td>
                    </tr>
                    <tr>
                        <td>Dance Date:</td>
                        <td>{order.danceDate}</td>
                    </tr>
                    <tr>
                        <th colSpan={2}>{style.type} Information</th>
                    </tr>
                    <tr>
                        <td>Ordered:</td>
                        <td>{style.name} {style.type}</td>
                    </tr>
                    <StyleRows order={order} style={style}></StyleRows>
                    <AddonRows order={order} style={style}></AddonRows>
                </tbody>
            </table>
        </OutputDiv>
    )
}

export default FinalizeOutput
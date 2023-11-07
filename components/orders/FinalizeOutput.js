import styled from "styled-components"
import StyleRows from "./StyleRows"
import AddonRows from "./AddonRows"

const OutputDiv = styled.div`
    // display: flex;
    // gap: 15px;
    width: 100%;
    
    table {
        width: 100%;
        border: 4px solid var(--main-green);
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

    .addonHead {
        background-color: lightgray;
    }

    @media (max-width: 650px) {
        flex-wrap: wrap;

        > div {
            width: 100%;
        }
    }
`


const FinalizeOutput = ({ order, style }) => {
    // console.log(order)

    // console.log(style)

    return (
        <OutputDiv id='printArea'>
            <table>
                <tbody>
                    <tr>
                        <th colSpan={2}>Personal Information</th>
                    </tr>
                    <tr>
                        <td>First Name:</td>
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
                    <StyleRows order={order} style={style} key={'styleRows'}></StyleRows>
                    <tr>
                        <th colSpan={2}>Finishing Touches</th>
                    </tr>
                    <AddonRows order={order} style={style} key={'addonRows'}></AddonRows>
                    <tr>
                        <th colSpan={2}>Total Cost: FIND IT!!!</th>
                    </tr>
                </tbody>
            </table>
        </OutputDiv>
    )
}

export default FinalizeOutput
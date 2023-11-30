import styled from 'styled-components'

import StyleRows from 'components/orders/finalize/StyleRows'
import AddonRows from 'components/orders/finalize/AddonRows'

import { setDate, formatPhone } from 'functions/orders'

const OutputDiv = styled.div`
    width: 100%;
    
    table {
        width: 100%;
        border: 4px solid var(--main-green);
    }

    table, th, td {
        border-collapse: collapse;
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

    let totalPrice = 0 
    totalPrice += style.price

    order.addon?.map((item) => {
        item.price ? totalPrice += item.price : ''
    })

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
                        <td>{order.phoneOne ? formatPhone(order.phoneOne): ''}</td>
                    </tr>
                    <tr>
                        <td>Phone number 2:</td>
                        <td>{order.phoneTwo ? formatPhone(order.phoneTwo): ''}</td>
                    </tr>
                    <tr>
                        <td>Dress Color:</td>
                        <td>{order.dressColor}</td>
                    </tr>
                    <tr>
                        <td>Dance Date:</td>
                        <td>{setDate(order.danceDate)}</td>
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
                        <th>Total Cost:</th><th>${totalPrice.toFixed(2)} + tax</th>
                    </tr>
                </tbody>
            </table>
        </OutputDiv>
    )
}

export default FinalizeOutput
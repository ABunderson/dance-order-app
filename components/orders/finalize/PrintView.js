import { getTotal, setDate } from "functions/orders"
import { Fragment } from "react"
import styled from "styled-components"
import {formatPhone} from 'functions/orders'

const ShowPrintDiv = styled.div`
    display: flex !important;
    flex-wrap: wrap;
    width: 100%;
    text-transform: capitalize;
    font-size: 1rem;

    .printDiv {
        display: flex !important;
        justify-content: space-between;
        flexwrap: wrap;

        @media (max-width: 350px) {
            flex-direction: column;
        }
    }

    section p {
        display: inline-block !important;
        padding-top: 5px !important;
        padding-bottom: 5px !important;
        padding-right: 5px;
    }
    
    section {
        width: 50%;
        border: 1px solid black;
        padding: 5px;
        padding-top: 10px;
    }  

    section hr {
        width: 100%;
        color: black;
        border: 1px solid black;
    }

    .priceP {
        padding: 0;
        float: right;
    }

    #stickers {
        display: flex !important;
        justify-content: center;
        gap: 35px;
    }

    .selected {
        border: 3px solid black;
        padding: 0px 5px !important;
        margin: 2px 7px;
        padding-bottom: 0px !important;
    }

    #instructionsP {
        text-transform: none;
    }

    @media (max-width: 700px){
        section {
            min-width: 100%;
        }  
    }

`



const PrintView = ({order, id}) => {

    const pickupDay = () => {
        if (order?.pickupDay) {
            let line
            order.pickupDay === 'friday' ? line = <><p className='selected'> Fri </p> <p> Sat </p></> : line = <><p> Fri </p> <p className='selected'> Sat </p></>
            return line
        } else {
            return <><p id='fri'> Fri </p> <p id='sat'> Sat </p></>
        }
    }

    const setStatus = () => {
        if (order?.payTime) {
            let line
            order.payTime === 'now' ? line = <><p className='selected'> Receipt </p> <p> COD </p></> : line = <><p> Receipt </p> <p className='selected'> COD </p></>
            return line
        } else {
            return <><p id='pay'> Receipt </p> <p id='cod'> COD </p></>
        }

    }

    const flowerSaved = () => {
        if (order?.saveFlower === 'yes') {
            return (
                <>
                <p>Flowers Saved by: </p>
                <hr></hr>
                </>
            )
        }
    }

    const setInstructions = () => {
        if (order?.specialInstructions){
            return (
                <>
                <p style={{ fontWeight: 'bold' }}>Notes</p>
                <hr></hr>
                <p style={{textTransform: 'none'}}>{order.specialInstructions}</p>
                </>
            )
        }
    }

    return (
        <ShowPrintDiv style={{ border: `8px solid ${order?.style?.pageColor}` }} id={id}>

            <section>
                <p>Name: </p>
                <p>{order?.firstName} {order?.lastName}</p>
                <hr></hr>

                <p>Phone 1: </p>
                <p>{order?.phoneOne ? formatPhone(order?.phoneOne): ''}</p>
                <hr></hr>

                <p>Phone 2: </p>
                <p>{order?.phoneTwo ? formatPhone(order?.phoneTwo): ''}</p>
                <hr></hr>

                <p>Dress Color:</p>
                <p>{order?.dressColor}</p>
                <hr></hr>
                <hr></hr>

                <div className='printDiv'>
                    <p>School: {order?.school}</p>
                    <p>Dance Date: {setDate(order?.danceDate)}</p>
                </div>
                <hr></hr>

                <p>Order Date:</p>
                <p>{setDate(order?.orderDate)}</p>
                <hr></hr>

                <p>Taken By:</p>
                <p id='initials' style={{ textTransform: 'uppercase' }}>{order?.initials ? order?.initials : ''}</p>
                <hr></hr>
                <hr></hr>

                <p>Pick up: </p>
                {pickupDay()}
                <hr></hr>

                <p>Status:</p>
                {setStatus()}
                <hr></hr>

                <div id='stickers'>

                    <svg height={78} width={78}>
                        <circle cx={39} cy={39} r={33}
                            stroke='black'
                            strokeWidth={2}
                            fill='none'
                        />
                        <text x={39} y={39}
                            textAnchor='middle'
                            stroke='black'
                            strokeWidth={1}
                            alignmentBaseline='middle'
                        >QC</text>
                    </svg>
                    <svg height={78} width={78}>
                        <circle cx={39} cy={39} r={33}
                            stroke='black'
                            strokeWidth={2}
                            fill='none'
                        />
                        <text x={39} y={39}
                            textAnchor='middle'
                            stroke='black'
                            strokeWidth={1}
                            alignmentBaseline='middle'
                        >PU</text>
                    </svg>
                </div>
            </section>
            <section>
                <p style={{ fontWeight: 'bold' }}>{order?.style.name} {order?.style.type}</p>
                <p className='priceP'>${order?.style?.price}</p>
                <hr></hr>
                <hr id='itemNameLine'></hr>

                {order?.style.flowerColor ? <><p>{order?.style.flower}: </p><p>{order.style.flowerColor}</p><hr id='flowerLine'></hr></> : <></>}
                {flowerSaved()}
                {order?.style.slapColor ? <><p>Slap Bracelet: </p><p>{order.style.slapColor}</p><hr></hr></> : <></>}
                {order?.style.metalBackColor ? <><p>Metal Back: </p><p>{order.style.metalBackColor}</p><hr></hr></> : <></>}
                {order?.style.ribbonColor ? <><p>{`Ribbon (${order.style.type === 'corsage' ? 'bow' : 'bout'}): `}</p><p>{order.style.ribbonColor}</p><hr></hr></> : <></>}
                <hr></hr>
                {order?.addon.length === 0 ? <></> : <><p style={{ fontWeight: 'bold' }}>Add ons</p><hr></hr><hr></hr></>}

                {order?.addon?.map((item) => {
                    const returnArr = []
                    returnArr.push(
                        <Fragment key={item.name}>
                            <div className='printDiv' >
                                <p style={{ textTransform: 'capitalize' }}>{item.name} </p>
                                {item.color ? <><p>Color: <span style={{ textDecoration: 'underline' }}>{item.color}</span></p></> : <p></p>}
                                {item.quantity ? <><p>Qty: <span style={{ textDecoration: 'underline' }}>{item.quantity}</span></p></> : <p></p>}
                                {item.price ? <><p> <span>${item.price.toFixed(2)}</span></p></> : ''}
                            </div>
                            <hr></hr>
                        </Fragment>
                    )
                    return returnArr.map((item) => {
                        return (item)
                    })
                })}
                <hr></hr>
                <div className='printDiv' style={{ fontWeight: 'bold' }}>
                    
                    <p>Total</p>
                    <p>${getTotal(order)}</p>
                </div>
                <hr></hr>
                <hr></hr>
                {setInstructions()}

            </section>
        </ShowPrintDiv>
    )
}

export default PrintView
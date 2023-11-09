import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { useRouter } from 'next/router'
import FinalizeOutput from 'components/orders/FinalizeOutput'
import FinalizeForm from 'components/orders/FinalizeForm'
import { Fragment, useContext, useEffect, useState } from 'react'
import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'

export default function Finalize() {
    const [order, setOrder] = useState('')
    const [style, setStyle] = useState('')
    const router = useRouter()
    const orderNum = useContext(OrderContext)
    const dance = useContext(DanceContext)
    // console.log(orderNum)
    console.log(order)

    const [breadcrumbs, setBreadcrumbs] = useState([])

    useEffect(() => {
        if (orderNum.orderNumber === 'default') {
            // router.push('/')
            orderNum.setOrderNumber("654c2611480ca44c4ce30dce")
        }
        async function getOrder() {
            const orderId = orderNum.orderNumber
            const response = await fetch(`/api/orders/${orderId}`)
            const data = await response.json()
            const order = data.orders[0]
            const prettyOrder = formatOrder(order)

            setOrder(prettyOrder)
            setStyle(order.style)
        }

        if (!order) {
            getOrder()
        }

        if (!router.isReady) {
            return
        } else {
            const {
                query: { paths }
            } = router

            const crumbs = { paths }

            if (crumbs.paths) {
                setBreadcrumbs(JSON.parse(crumbs.paths))
            }
        }

    }, [order, router, orderNum.orderNumber])

    function formatOrder(order) {
        order.phoneOne = `(${order.phoneOne.slice(0, 3)}) ${order.phoneOne.slice(3, 6)}-${order.phoneOne.slice(6, 10)}`
        order.phoneTwo = `(${order.phoneTwo.slice(0, 3)}) ${order.phoneTwo.slice(3, 6)}-${order.phoneTwo.slice(6, 10)}`

        let date = new Date(order.danceDate)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[date.getMonth()]

        order.danceDate = `${month} ${date.getDate()}`
        return (order)
    }

    async function onSubmit(event) {
        event.preventDefault()
        // console.log('submit')

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });
        console.log(convertedJSON)

        if (convertedJSON.pickupDay === 'friday') {
            document.querySelector('#fri').classList.add('selected')
            document.querySelector('#sat').classList.contains('selected') ? document.querySelector('#sat').classList.remove('selected') : ''
        } else {
            document.querySelector('#sat').classList.add('selected')
            document.querySelector('#fri').classList.contains('selected') ? document.querySelector('#fri').classList.remove('selected') : ''
        }

        if (convertedJSON.payTime === 'now') {
            document.querySelector('#pay').classList.add('selected')
            document.querySelector('#cod').classList.contains('selected') ? document.querySelector('#cod').classList.remove('selected') : ''
        } else {
            document.querySelector('#cod').classList.add('selected')
            document.querySelector('#pay').classList.contains('selected') ? document.querySelector('#pay').classList.remove('selected') : ''
        }

        if (convertedJSON.saveFlower === 'yes'){
            document.querySelector('#saveFlower').innerHTML = 'Flowers Saved by:'
            const line = document.createElement('hr')
            line.setAttribute('id', 'saveFlowerLine')
            document.querySelector('#saveFlower').append(line)
        } else {
            document.querySelector('#saveFlower').innerHTML = ''
        }

        convertedJSON.initials ? document.querySelector('#initials').innerHTML = convertedJSON.initials : ''

        if (convertedJSON.finishType === 'print') {
            window.print()
        }

        // unset context
        // orderNum.setOrderNumber('default')
        // dance.setDanceNumber('default')

        // router.push('/')
        // emailSomething()
        // if(email) {
        //     const recipient = 'practicedpuzzler@gmail.com'
        //     const subject = 'Test'
        //     const body = 'body of the email'
        //     const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        // }
        // print()
        // convertedJSON.password = await hashPassword(convertedJSON.password)

        // Login(convertedJSON)

        // event.target.reset()
    }

    return (
        <Fragment>
            <Layout pageTitle='Finalize'>

                {breadcrumbs ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}

                <h1>Finalize</h1>
                <h2>You are not done yet! Please follow the steps below.</h2>
                <p><b>First:</b> Check the information below to make sure it is correct. Fix anything that is wrong by going back to that page.</p>
                <p><b>Second:</b> Choose your pickup day at the bottom of the page.</p>
                <p><b>Third:</b> Decide when you want to pay. You can pay now or pay when you pickup. Pickup day will be faster for you if you pay now.</p>
                <p><b>Last:</b> Talk to an employee to pay and have the order confirmed. <b>{`If the order isn't confirmed it will not be made!!!`}</b></p>

                <FinalizeOutput order={order} style={style}></FinalizeOutput>

                <FinalizeForm submitAction={onSubmit} id='finalForm'></FinalizeForm>

                <div id='printA' style={{ border: `8px solid ${order.style?.pageColor}` }}>

                    <section id='sectionOne'>
                        <p>Name: </p>
                        <p>{order.firstName} {order.lastName}</p>
                        <hr></hr>
                        <p>Phone 1: </p>
                        <p>{order.phoneOne}</p>
                        <hr></hr>
                        <p>Phone 2: </p>
                        <p>{order.phoneTwo}</p>
                        <hr></hr>
                        <p>Dress Color:</p>
                        <p>{order.dressColor}</p>
                        <hr></hr>
                        <hr></hr>
                        <p>School:</p>
                        <p>{order.school}</p>
                        <hr></hr>
                        <p>Dance Date:</p>
                        <p>{order.danceDate}</p>
                        <hr></hr>

                        <p>Taken By:</p>
                        <p id='initials' style={{textTransform:'uppercase'}}></p>
                        <hr></hr>
                        <hr></hr>

                        <p>Pick up: </p>
                        <p id='fri'> Fri </p> <p id='sat'> Sat </p>
                        <hr></hr>

                        <p>Status:</p>
                        <p id='pay'> Receipt </p> <p id='cod'> COD </p>
                        <hr></hr>

                        <div id='stickers'>

                            <svg height='82' width='82'>
                                <circle cx='41' cy='41' r='35'
                                    stroke='black'
                                    strokeWidth={2}
                                    fill='none'
                                />
                                <text x='41' y={41}
                                    textAnchor='middle'
                                    stroke='black'
                                    strokeWidth={1}
                                    alignmentBaseline='middle'
                                >QC</text>
                            </svg>
                            <svg height='82' width='82'>
                                <circle cx='41' cy='41' r='35'
                                    stroke='black'
                                    strokeWidth={2}
                                    fill='none'
                                />
                                <text x='41' y={41}
                                    textAnchor='middle'
                                    stroke='black'
                                    strokeWidth={1}
                                    alignmentBaseline='middle'
                                >PU</text>
                            </svg>
                        </div>
                    </section>
                    <section id='sectionTwo'>
                        <p style={{ fontWeight: 'bold' }}>{style.name} {style.type}</p>
                        <p className='priceP'>${style.price}</p>
                        <hr></hr>
                        <hr></hr>

                        {style.flowerColor ? <><p>{style.flower}: </p><p>{style.flowerColor}</p><hr></hr></> : <></>}
                        <p id='saveFlower'></p>
                        {/* <p>DO SOMETHING HERE ABOUT SAVED FLOWERS</p>
                        <hr></hr> */}
                        {style.slapColor ? <><p>Slap Bracelet: </p><p>{style.slapColor}</p><hr></hr></> : <></>}
                        {style.metalBackColor ? <><p>Metal Back: </p><p>{style.metalBackColor}</p><hr></hr></> : <></>}
                        {style.ribbonColor ? <><p>{`Ribbon (${style.type === 'corsage' ? 'bow' : 'bout ribbon'}): `}</p><p>{style.ribbonColor}</p><hr></hr></> : <></>}
                        <hr></hr>
                        <p style={{ fontWeight: 'bold' }}>Add ons</p>
                        <hr></hr>

                        {order.addon?.map((item) => {
                            const returnArr = []
                            returnArr.push(
                                <>
                                    <div id='addonDiv'>
                                        <p style={{ textTransform: 'capitalize' }}>{item.name} </p>
                                        {item.color ? <><p>Color: <span style={{ textDecoration: 'underline' }}>{item.color}</span></p></> : <p></p>}
                                        {item.quantity ? <><p>Qty: <span style={{ textDecoration: 'underline' }}>{item.quantity}</span></p></> : <p></p>}
                                        {item.price ? <><p> <span>${item.price.toFixed(2)}</span></p></> : ''}
                                    </div>
                                    <hr></hr>
                                </>
                            )
                            return returnArr.map((item) => {
                                return item
                            })
                        })}

                    </section>
                </div>
            </Layout>
        </Fragment>
    )
}

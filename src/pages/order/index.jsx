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

    const [breadcrumbs, setBreadcrumbs] = useState([])

    useEffect(() => {
        if (orderNum.orderNumber === 'default') {
            router.push('/')
            // orderNum.setOrderNumber("654bb15b480ca44c4ce30dc7")
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
        // console.log(convertedJSON)

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
                {/* {console.log(order)} */}

                <h1>Finalize</h1>
                <h2>You are not done yet! Please follow the steps below.</h2>
                <p><b>First:</b> Check the information below to make sure it is correct. Fix anything that is wrong by going back to that page</p>
                <p><b>Second:</b> Choose your pickup day at the bottom of the page.</p>
                <p><b>Last:</b> Talk to an employee to pay and have the order confirmed. <b>{`If the order isn't confirmed it will not be made!`}</b></p>

                <FinalizeOutput order={order} style={style}></FinalizeOutput>

                <FinalizeForm submitAction={onSubmit} id='finalForm'></FinalizeForm>

                <div id='printA' style={{ border: `10px solid black` }}>

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
                        <p>GET INITIALS</p>
                        <hr></hr>
                        <hr></hr>

                        <p>Pick up:</p>
                        <p>DO SOMETHING HERE </p>
                        <p style={{border: '3px solid black', padding: '0px 5px 0px 5px', paddingBottom: '0px'}}>Fri</p> <p>Sat</p>
                        <hr></hr>

                        <p>Status:</p>
                        <p>PAID OR NOT PAID</p>
                        <p>Receipt</p> <p>COD</p>
                        <hr></hr>

                        <p>QC STICKER PLACE:</p>

                    </section>
                    <section id='sectionTwo'>
                        <p style={{fontWeight: 'bold'}}>{style.name} {style.type}</p>
                        <p className='priceP'>{style.price}</p>
                        <hr></hr>
                        <hr></hr>

                        {style.flowerColor ? <><p>{style.flower}: </p><p>{style.flowerColor}</p><hr></hr></> : <></>}
                        <p>DO SOMETHING HERE ABOUT SAVED FLOWERS</p>
                        <br></br>
                        {style.slapColor ? <><p>Slap Bracelet: </p><p>{style.slapColor}</p><hr></hr></> : <></>}
                        {style.metalBackColor ? <><p>Metal Back: </p><p>{style.metalBackColor}</p><hr></hr></> : <></>}
                        {style.ribbonColor ? <><p>{`Ribbon (${style.type === 'corsage' ? 'bow' : 'bout ribbon'}): `}</p><p>{style.ribbonColor}</p><hr></hr></> : <></>}
                        <hr></hr>
                        <p style={{fontWeight: 'bold'}}>Add ons</p>
                    </section>
                    {/* <tbody>
                        {/* <tr>
                        <th colSpan={2}>Personal Information</th>
                        <th colSpan={2}>cor information</th>
                    </tr> */}
                    {/* <tr>
                            <td style={{borderRight:'0px solid black'}}>Name:</td>
                            <td style={{ textTransform: 'capitalize', borderLeft:'0px solid black' }}>{order.firstName + ' ' + order.lastName}</td>

                            <td colSpan={2} style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{style.name} {style.type}</td>
                            <td>{style.price}</td>
                        </tr>
                        {console.log(style.flower)}
                        <tr>
                            <td>Phone 1:</td>
                            <td>{order.phoneOne}</td>
                            <td>{style.flower ? style.flower + ':' : 'No flower'}</td>
                            <td>{style.flower ? style.flowerColor : 'No flower'}</td>
                        </tr>
                        <tr>
                            <td>Phone 2:</td>
                            <td>{order.phoneTwo}</td>
                            <td>{style.metalBackColor ? 'Metal Back' + ':' : style.slapColor ? 'Slap Bracelet:' : style.ribbonColor ? 'Ribbon Color:' : 'no ribbon'}</td>
                            <td>{style.metalBackColor ? style.metalBackColor : style.slapColor ? style.slapColor : style.ribbonColor ? style.ribbonColor : 'no ribbon'}</td>
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
                        </tr> */}
                    {/* <StyleRows order={order} style={style} key={'styleRows'}></StyleRows> */}
                    {/* <tr>
                            <th colSpan={2}>Finishing Touches</th>
                        </tr> */}
                    {/* <AddonRows order={order} style={style} key={'addonRows'}></AddonRows> */}
                    {/* <tr>
                            <th colSpan={2}>Total Cost: FIND IT!!!</th>
                        </tr>
                    </tbody> */}
                </div>

            </Layout>
        </Fragment>
    )
}

import { Fragment } from "react"

const AddonRows = ({ style, order }) => {
    // console.log(style)

    let newOrder = { ...order }

    const handleObject = (newOrder) => {
        delete newOrder._id
        delete newOrder.firstName
        delete newOrder.lastName
        delete newOrder.phoneOne
        delete newOrder.phoneTwo
        delete newOrder.danceDate
        delete newOrder.school
        delete newOrder.dressColor
        delete newOrder.flowerColor
        delete newOrder.slapColor
        delete newOrder.metalBackColor
        delete newOrder.ribbonColor
        delete newOrder.styleId
    }

    handleObject(newOrder)
    // console.log(newOrder)
    const orderArray = Object.entries(newOrder)

    return (
        <>
            {orderArray.map((item) => {
                // console.log(item[0])
                if (item[0] === 'extrametalleafColor') {
                    // console.log('has metal leaf')
                    return <Fragment key={item[0] + 'addonRows'}>
                        <tr className="addonHead">
                            <td >Metal Leaf Color:</td>
                            <td>{item[1]}</td>
                        </tr>
                        <tr>
                            <td>Amount:</td>
                            <td>{order.metalleafquantity}</td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>ADD THIS IN</td>
                        </tr>
                    </Fragment>
                }
                if (item[0] === 'extrajewelstemColor') {
                    // console.log('has metal leaf')
                    return <Fragment key={item[0] + 'addonRows'}>
                        <tr className="addonHead">
                            <td >Jewel Stem Color:</td>
                            <td>{item[1]}</td>
                        </tr>
                        <tr>
                            <td>Amount:</td>
                            <td>{order.jewelstemquantity}</td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>ADD THIS IN</td>
                        </tr>
                    </Fragment>
                }
                if (item[0] === 'extraRibbonColor') {
                    // console.log('has extra ribbon')
                    return <Fragment key={item[0] + 'addonRows'}>
                        <tr className="addonHead">
                            <td>Extra Ribbon Color:</td>
                            <td>{item[1]}</td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>{style.type === 'corsage'? '$5' : '$1'}</td>
                        </tr>
                    </Fragment>
                }
                if (item[0] === 'bleachedaccents') {
                    // console.log('has extra ribbon')
                    return <Fragment key={item[0] + 'addonRows'}>
                        <tr className="addonHead">
                            <td>{item[1]}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>ADD THIS IN</td>
                        </tr>
                    </Fragment>
                }

            })}
        </>
    )
}

export default AddonRows
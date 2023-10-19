import { Fragment } from "react"


const StyleRows = ({ style, order }) => {
    // console.log(style)

    let newStyle = { ...style }
    const handleObject = (style) => {
        delete style.price
        delete style._id
        delete style.description
        delete style.image
        delete style.name
        delete style.popular
        delete style.type
        delete style.pageColor
        delete style.defaultStyle
    }

    handleObject(newStyle)
    const styleArray = Object.entries(newStyle)

    return (
        <>
        {styleArray.map((item) => {
            // console.log(item[0])
            if (item[0] === 'flower' && item[1] !== 'null'){
                // console.log('has flower')
                return <Fragment key={item[0]+'styleRows'}><tr><td>Flower:</td><td>{item[1]}</td></tr><tr><td>Flower Color:</td><td>{order.flowerColor}</td></tr></Fragment>
            }
            if (item[0] === 'wristlet' && item[1] === 'slap' && order.slapColor) {
                // console.log('has wristlet')
                return <tr key={item[0] + 'styleRows'}><td>Slap Bracelet Color:</td><td>{order.slapColor}</td></tr>
            }
            if (item[0] === 'ribbon' && item[1] === true){
                // console.log('has Ribbon')
                return <tr key={item[0] + 'styleRows'}><td>Ribbon Color:</td><td>{order.ribbonColor}</td></tr>
            }
            if (item[0] === 'metalBack' && item[1] === true){
                // console.log('has metalback')
                return <tr key={item[0] + 'styleRows'}><td>Metal Back Color:</td><td>{order.metalBackColor}</td></tr>
            }

        })}
        <tr><td>Price:</td><td>{'$'+style.price}</td></tr>
        </>
    )
}

export default StyleRows
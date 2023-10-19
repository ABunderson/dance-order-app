

const AddonRows = ({style, order}) => {

    return (
        <>
            {order.flowerColor ?
                <>
                    <tr>
                        <td>Flower:</td>
                        <td>{style.flower}</td>
                    </tr>
                    <tr>
                        <td>Flower Color:</td>
                        <td>{order.flowerColor}</td>
                    </tr>
                </> : <></>}
                {style.metalBack ?
                <>
                    <tr>
                        <td>Metal Back Color:</td>
                        <td>{order.metalBackColor}</td>
                    </tr>
                </> : <></>}
                {style.wristlet === 'slap' && order.slapColor ?
                <>
                    <tr>
                        <td>Slap Bracelet Color:</td>
                        <td>{order.slapColor}</td>
                    </tr>
                </> : <></>}
                {style.ribbon ?
                <>
                    <tr>
                        <td>Ribbon Color:</td>
                        <td>{order.ribbonColor}</td>
                    </tr>
                </> : <></>}
        </>
    )
}

export default AddonRows
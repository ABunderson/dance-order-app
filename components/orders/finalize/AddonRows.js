import { Fragment } from "react"

const AddonRows = ({ order }) => {
    const addons = order.addon

    return (
        <>
            {addons?.map((item, index) => {
                const pieceArray = []

                for (let key of Object.keys(item)) {

                    if (key === 'name') {
                        pieceArray.push(<tr className='addonHead' key={`${item.name} + head`}><td colSpan={2}>{item.name}</td></tr>)
                    } else if (key === 'price'){

                        if(item[key] < 1){
                            const price = item[key] * 100
                            pieceArray.push(<tr key={`${item.name} + ${key}`}><td>{key}:</td><td>{price}￠</td></tr>)
                        } else {
                            pieceArray.push(<tr key={`${item.name} + ${key}`}><td>{key}:</td><td>${item[key]}</td></tr>)
                        }
                        
                    } else {
                        pieceArray.push(<tr key={`${item.name} + ${key}`}><td>{key}:</td><td>{item[key]}</td></tr>)
                    }

                }

                return (
                    <Fragment key={item.name}>
                        {pieceArray.map((item) => {
                            return item
                        })}

                    </Fragment>
                )
            })}
        </>
    )
}

export default AddonRows
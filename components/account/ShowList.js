
const ShowList = ({ objects }) => {

    // objects.map((item) => {
    //     console.log(item.name)
    //     console.log(item._id)
    // })

    return (
        <>
            {
                objects.map((item) => {
                    // console.log(item.name)
                    // console.log(item._id)
                    return (
                        <p style={{ textTransform: 'capitalize', }} key={item._id}>{item.name} {item.type ? item.type : ''}</p>
                    )
                })
            }
        </>
    )
}

export default ShowList
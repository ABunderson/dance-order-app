const setDate = (dateObject) => {
    const newDate = new Date(dateObject)

    const months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    const month = months[newDate.getMonth()]

    return `${month} ${newDate.getDate()}`
}

const getTotal = (order) => {
    let total = 0
    total += order?.style.price
    order?.addon?.map((item) => {
        item.price ? total += item.price : ''
    })
    return total
}

const formatPhone = (phone) => {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
}

function formatOrder(order) {

    order.phoneOne = formatPhone(order.phoneOne)
    order.phoneTwo = formatPhone(order.phoneTwo)

    order.formatDanceDate = setDate(order.danceDate)
    order.formatOrderDate = setDate(order.orderDate)

    return (order)
}

const deleteBadOrders = async () => {

    let res = await fetch(`/api/orders/delete`, {
      method: 'POST',
    })
    res = await res.json()
    // console.log(res)
    // console.log('delete bad orders')
  }


export {setDate, getTotal, formatOrder, deleteBadOrders, formatPhone}
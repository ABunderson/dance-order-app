import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { deleteBadOrders } from 'functions/orders'

import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'
import MessageContext from 'context/MessageContext'

import Layout from 'components/allPages/Layout'
import HeroImage from 'components/HeroImage'
import { Alert } from 'components/allPages/Alert'
import Button from 'components/Button'

import { alertService } from 'services/alert.service'

export default function Home() {
  const router = useRouter()

  const { orderNumber, setOrderNumber } = useContext(OrderContext)
  const { danceNumber, setDanceNumber } = useContext(DanceContext)
  const { message, setMessage } = useContext(MessageContext)
  
  let count = 0

  useEffect(() => {

    deleteBadOrders()

    if (message !== 'default') {
      if (count === 0) alertService.warn(message, { autoClose: false, keepAfterRouteChange: false })
      setMessage('default')
      count += 1
    }

  }, [])

  setDanceNumber('default')
  setOrderNumber('default')

  return (
    <Layout pageTitle='Home'>
      <Alert />

      <HeroImage />

      <Button text='Order now!' type='button' action={() => { router.push('order/information') }} id='order'></Button>

      <h1>What We Do</h1>
      <p>This site makes ordering a boutonniere or corsage for yourself or your child an easy painless process. The choices for style, flower, and color choice have pictures to show what you will be getting, and you can pick how styles are arranged based on what is important to you. This site is only available at the florists and will not be available from other locations/wi-fi networks.</p>

      <h2>What We Recommend</h2>
      <p>Picking out the perfect dance flower can be hard. To get a gorgeous creation we recommend choosing a color of flower that is NOT white. School dances are fun, and boutonnieres and corsages should be fun too! Spice up a design by adding a color that coordinates or highlights the color of the dress. If you have questions about which fun color can go with your dress, please ask one of our experienced designers for help.</p>

    </Layout>
  )
}
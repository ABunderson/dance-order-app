import { useState, createContext } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import UserContext from 'context/UserContext'
import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'
import MessageContext from 'context/MessageContext'

export default function App({ Component, pageProps }: AppProps) {

  const [userName, setUserName] = useState('default')
  const [orderNumber, setOrderNumber] = useState('default')
  const [danceNumber, setDanceNumber] = useState('default')
  const [message, setMessage] = useState('default')

  return (<>
    <UserContext.Provider value={{ userName, setUserName }}>
      <OrderContext.Provider value={{ orderNumber, setOrderNumber }}>
        <DanceContext.Provider value={{ danceNumber, setDanceNumber }}>
          <MessageContext.Provider value={{ message, setMessage }}>
            <Component {...pageProps} />
          </MessageContext.Provider>
        </DanceContext.Provider>
      </OrderContext.Provider>
    </UserContext.Provider>
  </>)
}

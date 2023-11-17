import { useState, createContext } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import UserContext from 'context/UserContext'
import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'

// export const UserContext = createContext('not set')



export default function App({ Component, pageProps }: AppProps) {
  
// export default function App({ Component, pageProps }) {
  const [userName, setUserName] = useState('default')
  const [orderNumber, setOrderNumber] = useState('default')
  const [danceNumber, setDanceNumber] = useState('default')

  return (<>
    <UserContext.Provider value={{ userName, setUserName }}>
      <OrderContext.Provider value={{ orderNumber, setOrderNumber }}>
        <DanceContext.Provider value={{ danceNumber, setDanceNumber }}>
          <Component {...pageProps} />
        </DanceContext.Provider>
      </OrderContext.Provider>
    </UserContext.Provider>
  </>)
}

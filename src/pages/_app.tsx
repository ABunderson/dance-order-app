import {useState, createContext} from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import UserContext from 'components/UserContext'

// export const UserContext = createContext('not set')


export default function App({ Component, pageProps }: AppProps) {
  const [userName, setUserName] = useState('default')

  return (<>
    <UserContext.Provider value={{userName, setUserName}}>
      <Component {...pageProps} />
    </UserContext.Provider>
  </>)
}

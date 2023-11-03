import React from 'react'

const UserContext = React.createContext(
    //default value 
    'a string that is available'
)

const UserProvider = UserContext.Provider
const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }
export default UserContext
// outsid e on component page 
// ComponentE.contextType = UserContext
// inside static contextType = UserContext

// wrap the page that you need with <UserProvider> as the base tag
// remember to import it in
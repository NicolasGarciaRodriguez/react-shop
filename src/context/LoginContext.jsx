import React from 'react'

export const LoginContext = React.createContext(null)

export const LoginProvider = ({ children }) => {
    const [userLogged, setUserLogged] = React.useState(null);

    const store = {
        userLogged,
        setUserLogged,
    };


    return <LoginContext.Provider value={store}>{children}</LoginContext.Provider>
}
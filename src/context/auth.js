import {createContext, useContext, useState } from 'react';

const userContext = createContext();

const Provider = ({children}) => {
    const [user, setUser] = useState({
        user: null,
        token: ""
    });
    return (
          <userContext.Provider value={[user,setUser]}>
            {children}
          </userContext.Provider>
    )

}

//custom context provider like an hook
const useAuthProvider = () => useContext(userContext);
export{useAuthProvider,Provider}
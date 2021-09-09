import { createContext, useState } from "react";


export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    
    const [authToken, setAuthToken] = useState();

    return ( 
        <AuthContext.Provider value={{authToken, setAuthToken}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;
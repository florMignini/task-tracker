import { ReactNode, createContext } from "react";


type Props = {
    children :ReactNode
  }
const AuthContext = createContext({})
const AuthProvider = ({children}: Props) => {

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider};

export default AuthContext;
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext({});
const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
    
      if (!token) {
        return;
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
           
        console.log(data)
        setAuth(data)
      } catch (error: any) {
        console.log(error)
      }
    };
    authUser()
  }, []);

  return (
    <AuthContext.Provider value={{auth, setAuth }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

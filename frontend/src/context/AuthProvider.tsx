/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext({});
const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/user/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAuth(data);
      } catch (error: any) {
        setAuth({});
      }
      setLoading(false);
    };
    authUser();
  }, []);

  const logOutSession = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logOutSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

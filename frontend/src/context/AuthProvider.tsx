/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const AuthContext = createContext({});
const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";


export interface useAuthType {
  auth ?: {
    createdAt: string;
    email: string;
    name: string;
    profilePicture: string;
    updatedAt: string;
    _id?: string;
  };
  loading?: boolean;
  setAuth?: any;
  setLoading?: any;
  logOutSession?:any;
}

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

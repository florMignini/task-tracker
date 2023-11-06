import { Outlet, Navigate } from "react-router-dom"
import useAuth, { useAuthType } from "../hooks/useAuth"
import { HashLoader } from "react-spinners";
const ProtectedLayout = () => {
//user session information
    const {auth, loading}:useAuthType = useAuth();


    if(loading) return <HashLoader color="#1ea7fd" />
  return (
    <main className="container m-auto flex justify-center items-center">
    {auth && auth._id ? <Outlet/> : <Navigate to="/" />}
     </main>
  )
}

export default ProtectedLayout
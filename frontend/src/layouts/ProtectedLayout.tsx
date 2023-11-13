import { Outlet, Navigate } from "react-router-dom";
import useAuth, { useAuthType } from "../hooks/useAuth";
import { HashLoader } from "react-spinners";
import { Header, Sidebar } from "../components";
const ProtectedLayout = () => {
  //user session information
  const { auth, loading }: useAuthType = useAuth();

  if (loading) return(
    <div className="w-full h-screen flex items-center justify-center">
      <HashLoader color="#39c7ad" />
    </div>
    );
  return (
    <>
      {auth && auth._id ? (
        <div className="bg-white text-gray-600 md:flex min-h-screen ">
          <Sidebar />
          <main className="text-black rounded-xl flex-1 flex-col mt-5">
            <Header />
           <div className="p-5 bg-slate-100 h-screen rounded-lg">
           <Outlet />
           </div>
          </main>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedLayout;

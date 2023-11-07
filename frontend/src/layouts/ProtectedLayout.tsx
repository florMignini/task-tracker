import { Outlet, Navigate } from "react-router-dom";
import useAuth, { useAuthType } from "../hooks/useAuth";
import { HashLoader } from "react-spinners";
import { Header, Sidebar } from "../components";
const ProtectedLayout = () => {
  //user session information
  const { auth, loading }: useAuthType = useAuth();

  if (loading) return <HashLoader color="#1ea7fd" />;
  return (
    <>
      {auth && auth._id ? (
        <div className="bg-white text-gray-600 md:flex min-h-screen">
          <Sidebar />
          <main className="bg-slate-100 text-black rounded-xl flex-1 flex-col mt-5">
            <Header />
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedLayout;

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
        <div className="bg-black text-white md:flex min-h-screen">
          <Sidebar />
          <main className="bg-white text-black rounded-xl flex-1 flex-col m-5 p-4">
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

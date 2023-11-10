import { Navigate, Outlet } from "react-router-dom";
const AuthLayout = () => {
  const token = localStorage.getItem("token");
  if(token)  return <Navigate to='/dashboard'/>
  return (
    <main className="container mx-auto md:flex md:justify-center">
      <div className="md:w-2/3 lg:1/2">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
